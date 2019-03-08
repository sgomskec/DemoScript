const url = require('url');

function androidCapabilities({
  app,
  remoteUri,
  deviceId,
  resetOpt,
}) {
  const remoteUrl = new url.URL(remoteUri);
  return {
    desiredCapabilities: {
      automationName: 'Appium',
      'appium-version': '1.7.2',
      platformName: 'Android',
      deviceName: deviceId,
      udid: deviceId,
      noReset: resetOpt,
      fullReset: false,
      appWaitActivity: '*.MainActivity,*.SplashScreen',
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

module.exports = {
  androidCapabilities,
};
