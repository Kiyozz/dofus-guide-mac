import * as path from 'path'
import * as os from 'os'
import { app, BrowserWindow, ipcMain, session, screen } from 'electron'
import { PrismaClient } from '@prisma/client'
import singleInstance from './singleInstance'
import dynamicRenderer from './dynamicRenderer'
import titleBarActionsModule from './modules/titleBarActions'
import updaterModule from './modules/updater'
import macMenuModule from './modules/macMenu'
import * as url from 'node:url'

const prisma = new PrismaClient()
const preloadPath = path.join(__dirname, 'preload.js')

// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
const isProduction = process.env.NODE_ENV !== 'development'
const platform: 'darwin' | 'win32' | 'linux' = process.platform as any
const architucture: '64' | '32' = os.arch() === 'x64' ? '64' : '32'
const headerSize = 32
const modules = [titleBarActionsModule, macMenuModule, updaterModule]

function openGuideWindow(y: number, x: number, opacity: number, url: string) {
  const guideWindow = new BrowserWindow({
    width: 340,
    height: 700,
    x,
    y,
    opacity,
    titleBarOverlay: true,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      webSecurity: false,
      contextIsolation: true
    }
  })
  dynamicRenderer(guideWindow, url)
}

function openJobs(url: string) {
  const guideWindow = new BrowserWindow({
    width: 500,
    height: 500,
    titleBarOverlay: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      webSecurity: false,
      contextIsolation: true
    }
  })
  dynamicRenderer(guideWindow, url)
}

// Initialize app window
// =====================
function createWindow() {
  console.log('System info', { isProduction, platform, architucture })
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1280,
    height: 800,
    backgroundColor: '#000',
    webPreferences: {
      webSecurity: false,
      devTools: !isProduction,
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hiddenInset', // Utilise hiddenInset sur macOS
    titleBarOverlay: platform === 'darwin' ? { height: headerSize } : undefined, // Gère l'overlay de la barre de titre sur macOS
    title: 'Dofus Guide'
  })

  // Lock app to single instance
  if (singleInstance(app, mainWindow)) return

  // Open the DevTools.
  !isProduction &&
    mainWindow.webContents.openDevTools({
      mode: 'bottom'
    })

  return mainWindow
}

// App events
// ==========
app.whenReady().then(async () => {
  if (!isProduction) {
    try {
      await session.defaultSession.loadExtension(path.join(__dirname, '../..', '__extensions', 'vue-devtools'))
    } catch (err) {
      console.log('[Electron::loadExtensions] An error occurred: ', err)
    }
  }

  const mainWindow = createWindow()
  if (!mainWindow) return

  // Load renderer process
  await dynamicRenderer(mainWindow)

  // Initialize modules
  console.log('-'.repeat(30) + '\n[+] Loading modules...')
  modules.forEach((module) => {
    try {
      module(mainWindow)
    } catch (err: any) {
      console.log('[!] Module error: ', err.message || err)
    }
  })

  console.log('[!] Loading modules: Done.' + '\r\n' + '-'.repeat(30))

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) createWindow()
    mainWindow.show()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('open-modal', (_, { top, left, opacity, url }) => {
  // Vérifie les types des arguments et applique des valeurs par défaut si nécessaire
  openGuideWindow(typeof top === 'number' ? top : 300, typeof left === 'number' ? left : 0.5, typeof opacity === 'number' ? opacity : 0.9, url)
})

ipcMain.on('open-jobs', (_, { url }) => {
  // Vérifie les types des arguments et applique des valeurs par défaut si nécessaire
  openJobs(url)
})

ipcMain.handle(
  'prisma-operation',
  async (
    _,
    {
      model,
      action,
      args
    }: {
      model: keyof PrismaClient
      action: string
      args: any
    }
  ) => {
    try {
      // Vérifiez que prisma[model] est un objet et que prisma[model][action] est une fonction
      const modelOperations = prisma[model as keyof PrismaClient] as any
      const operation = modelOperations[action]

      if (typeof operation !== 'function') {
        throw new TypeError(`Action '${action}' is not valid on model`)
      }

      // Exécuter l'opération avec les arguments
      const result = await operation(args)
      return { success: true, data: result }
    } catch (error) {
      // Gérer le type de l'erreur et afficher un message approprié
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      console.error('Prisma operation error:', errorMessage)
      return { success: false, error: errorMessage }
    }
  }
)

ipcMain.on('close-window', () => {
  BrowserWindow.getFocusedWindow()?.close()
})

ipcMain.on('minimize-window', () => {
  BrowserWindow.getFocusedWindow()?.minimize()
})

ipcMain.on('maximize-window', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow?.isMaximized()) {
    focusedWindow.unmaximize()
  } else {
    focusedWindow?.maximize()
  }
})
