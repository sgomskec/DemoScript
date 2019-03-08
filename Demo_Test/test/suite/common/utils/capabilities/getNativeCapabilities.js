const url = require('url');

function getNativeCapabilities({
  app,
  remoteUri,
  deviceId,
  resetOpt,
}) {
  const remoteUrl = new url.URL(remoteUri);
  return {
    desiredCapabilities: {
      automationName: 'Appium',
      platformName: 'Android',
      deviceName: deviceId,
      udid: deviceId,
      noReset: resetOpt,
      fullReset: false,
      appActivity: 'com.android.contacts.activities.PeopleActivity',
      appPackage: 'com.lalamove.techchallenge',
      waitforTimeout: 50000,
      app,
      autoGrantPermissions: 'true',
      autoAcceptAlerts: 'true',
    },
    host: remoteUrl.hostname,
    port: remoteUrl.port,
  };
}
module.exports = getNativeCapabilities;
