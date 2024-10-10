// eslint-disable-next-line @typescript-eslint/no-var-requires
const builder = require('electron-builder')
const Platform = builder.Platform

/**
 * @type {import('electron-builder').Configuration}
 */
const options = {
  appId: 'com.humbrain.dofusguide',
  // protocols: {
  // name: 'Your deeplink',
  // - Don't forget to set `MimeType: "x-scheme-handler/deeplink"` for `linux.desktop` entry!
  // schemes: ['deeplink']
  // },
  // - Electron auto-updater config
  publish: [
    {
      provider: 'github',
      owner: 'steodec',
      repo: 'dofus-guide-mac',
      releaseType: 'release'
    }
  ],

  // "store" | "normal" | "maximum" - For testing builds, use 'store' to reduce build time significantly.
  compression: 'store',
  removePackageScripts: true,

  nodeGypRebuild: false,
  buildDependenciesFromSource: false,

  directories: {
    output: 'build'
  },
  win: {
    // eslint-disable-next-line no-template-curly-in-string
    artifactName: '${productName}-Setup-${version}.${ext}',
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      }
    ]
  },
  nsis: {
    deleteAppDataOnUninstall: true
  },
  mac: {
    category: 'com.humbrain.dofusguide',
    icon: '.output/public/img/icons/icon.icns',
    hardenedRuntime: false,
    gatekeeperAssess: false,
    identity: 'PAUL CHARLES PIERRE TEDESCO (9ZBRH92F53)',
    target: [
      {
        target: 'default',
        arch: ['x64', 'arm64']
      }
    ]
  },
  linux: {
    maintainer: 'Steodec',
    desktop: {
      StartupNotify: 'false',
      Encoding: 'UTF-8',
      MimeType: 'x-scheme-handler/deeplink'
    },
    target: ['AppImage', 'rpm', 'deb']
  }
}

const platforms = ['MAC']

platforms.forEach((platform) => {
  builder
    .build({
      targets: Platform[platform].createTarget(),
      config: options
    })
    .then((result) => {
      console.log('----------------------------')
      console.log('Platform:', platform)
      console.log('Output:', JSON.stringify(result, null, 2))
    })
})
