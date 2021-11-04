const { getArgv } = require('../../utils/cmd-utils')

const DEFAULT_SETTINGS = 'local'
const SETTINGS_FILE_PREFIX = 'settings'

function getSettings () {
  let settingsName = getArgv(SETTINGS_FILE_PREFIX)

  if (!settingsName) {
    settingsName = DEFAULT_SETTINGS
  }

  return require(`../config/${SETTINGS_FILE_PREFIX}-` + settingsName)
}

module.exports = {
  getSettings
}
