// This is the preload script for Electron.
// It runs in the renderer process before the page is loaded.
// --------------------------------------------

// import { contextBridge } from 'electron'

// process.once('loaded', () => {
//   - Exposed variables will be accessible at "window.versions".
//   contextBridge.exposeInMainWorld('versions', process.env)
// })

import { contextBridge, ipcRenderer } from 'electron'

process.once('loaded', () => {
  console.log('preload.ts loaded')
  contextBridge.exposeInMainWorld('electronAPI', {
    openModal: (top: number, left: number, opacity: number) =>
      ipcRenderer.send('open-modal', {
        top,
        left,
        opacity
      }),
    prismaOperation: (model: string, action: string, args: any) =>
      ipcRenderer.invoke('prisma-operation', {
        model,
        action,
        args
      }),
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window')
  })
})
