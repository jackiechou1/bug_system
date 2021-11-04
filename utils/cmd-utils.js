function getArgv (key) {
  const regSettings = new RegExp(`${key}=(.+)`)
  let settingsName

  for (let arg of process.argv) {
    if (regSettings.test(arg)) {
      settingsName = regSettings.exec(arg)[1]
      break
    }
  }

  return settingsName
}

module.exports = {
  getArgv
}
