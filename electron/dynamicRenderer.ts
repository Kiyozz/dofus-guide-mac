import * as path from 'path'
import http from 'http'
import { BrowserWindow } from 'electron'
import express, { static as serveStatic } from 'express'

// Internals
const isProduction = process.env.NODE_ENV !== 'development'

// Function to check if the server is running
function checkServerRunning(port: number) {
  return new Promise((resolve) => {
    const options = {
      host: 'localhost',
      port,
      timeout: 2000
    }

    const req = http.request(options, (res) => {
      resolve(res.statusCode === 200) // Server is running
    })

    req.on('error', () => resolve(false)) // Server is not running
    req.end()
  })
}

// Dynamic Renderer
export default async function (mainWindow: BrowserWindow, url: string = '') {
  if (!isProduction) {
    return mainWindow.loadURL('http://localhost:3000/' + url)
  }

  const port = 8079
  const serverRunning = await checkServerRunning(port)

  if (serverRunning) {
    // Le serveur est déjà lancé, ouvrez juste la fenêtre
    console.log(`Server already running on http://localhost:${port}`)
    mainWindow.loadURL(`http://localhost:${port}/` + url)
  } else {
    // Lancer le serveur car il n'est pas déjà lancé
    const app = express()
    app.use('/', serveStatic(path.join(__dirname, '../public')))

    const listener = app.listen(port, 'localhost', () => {
      const actualAddress = listener.address()
      if (typeof actualAddress === 'string') {
        console.log(`Server running on path ${actualAddress}`)
      } else if (actualAddress && typeof actualAddress === 'object') {
        const actualPort = actualAddress.port
        console.log('Dynamic-Renderer Listening on', actualPort)
        mainWindow.loadURL(`http://localhost:${actualPort}/` + url)
      }
    })
  }
}
