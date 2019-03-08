import { createDMSClient } from 'mverf-device-mgmt-client-lib';

const config = require('../../../env');
const dmsClientLib = require('mverf-device-mgmt-client-lib');
const capabilities = require('../utils/capabilities/getCapabilities');
const nativecapabilities = require('../utils/capabilities/getNativeCapabilities');


const APK_PATH = 'androidApkPath';
const DMS_HOST = 'dmsHost';
const DMS_PORT = 'dmsPort';
const APK_PATH_UPGRADE = 'apkPathForUpgrade';

const dmsClientConfig = {
  host: config[DMS_HOST],
  port: config[DMS_PORT],
};

let dmsClient;
let android1;
let android2;
let iphone1;
let webClient1;
let dmsRegClient;

async function allocateAndroid1Device() {
  dmsClient = dmsClientLib.createDMSClient(dmsClientConfig);
  android1 = await dmsClient.allocateDevice({
    id: '5200e852fe8f642f',
    info: {
      kind: 'PHONE',
      platform: 'ANDROID',
    },
  });
  const capabilitiesWithoutCache = capabilities.androidCapabilities({
    app: config[APK_PATH],
    remoteUri: android1.remoteUri,
    deviceId: android1.id,
    resetOpt: false,
  });
  const capabilitiesWithCache = capabilities.androidCapabilities({
    app: config[APK_PATH],
    remoteUri: android1.remoteUri,
    deviceId: android1.id,
    resetOpt: true,
  });
  const upgradeCapabilities = capabilities.androidCapabilities({
    app: config[APK_PATH_UPGRADE],
    remoteUri: android1.remoteUri,
    deviceId: android1.id,
    resetOpt: false,
  });
  const nativeCapabilities = nativecapabilities({
    remoteUri: android1.remoteUri,
    deviceId: android1.id,
    resetOpt: true,
  });
  return {
    upgradeCapabilities,
    nativeCapabilities,
    capabilitiesWithoutCache,
    capabilitiesWithCache,
    dmsClient,
    android1,
  };
}

async function allocateAndroid2Device() {
  dmsClient = dmsClientLib.createDMSClient(dmsClientConfig);
  android2 = await dmsClient.allocateDevice({
    id: 'aa62d0ef',
    info: {
      kind: 'PHONE',
      platform: 'ANDROID',
    },
  });
  const capabilitiesWithoutCache = capabilities.androidCapabilities({
    app: config[APK_PATH],
    remoteUri: android2.remoteUri,
    deviceId: android2.id,
    resetOpt: false,
  });
  const capabilitiesWithCache = capabilities.androidCapabilities({
    app: config[APK_PATH],
    remoteUri: android2.remoteUri,
    deviceId: android2.id,
    resetOpt: true,
  });
  return {
    capabilitiesWithoutCache,
    capabilitiesWithCache,
    dmsClient,
    android2,
  };
}



function getDmsClient() {
  if (!dmsClient) {
    dmsRegClient = createDMSClient(dmsClientConfig);
  }
  return dmsRegClient;
}
async function deallocateAndroid1Device() {
  if (!android1) {
    return;
  }
  await dmsClient.deallocateDevice(android1.id);
}
async function deallocateAndroid2Device() {
  if (!android2) {
    return;
  }
  await dmsClient.deallocateDevice(android2.id);
}

async function registerDmsClient() {
  await getDmsClient().registerClient();
}
async function unregisterDmsClient() {
  await getDmsClient().unregisterClient();
}
module.exports = {
  allocateAndroid1Device,
  allocateAndroid2Device,
  deallocateAndroid1Device,
  deallocateAndroid2Device,
  registerDmsClient,
  unregisterDmsClient,
};
