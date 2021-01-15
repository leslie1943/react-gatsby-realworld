const fs = require('fs')
const { resolve } = require('path')
const { join } = require('path')
const cp = require('child_process')
const os = require('os')

const lib = resolve(__dirname, 'plugins')

fs.readdirSync(lib).forEach((mod) => {
  const modPath = join(lib, mod)

  if (!fs.existsSync(join(modPath, 'package.json'))) {
    return
  }

  const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

  cp.spawn(npmCmd, ['i'], {
    env: process.env,
    cwd: modPath,
    stdio: 'inherit',
  })
})
