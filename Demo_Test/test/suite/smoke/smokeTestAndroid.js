const webdriverio = require('webdriverio');
const manageDeviceAllocation = require('../common/utils/deviceAllocation');
const SignupPageTest = require('../common/pageObjects/android/Landingpage');

describe('Demo Test', function () {
  let client1WithoutCache;
  
  const waitTime = 120000;

  before(async function () {
    this.timeout(120000);
    const options1 = await manageDeviceAllocation.allocateAndroid1Device();
    const options2 = await manageDeviceAllocation.allocateAndroid2Device();

    const optionNoCache1 = options1.capabilitiesWithoutCache;
    const optionWithCache1 = options1.capabilitiesWithCache;

    const optionNoCache2 = options2.capabilitiesWithoutCache;
    const optionWithCache2 = options2.capabilitiesWithCache;

    const optionNativeCache = options1.nativeCapabilities;
    const optionUpgradeCache = options1.upgradeCapabilities;

    client1WithoutCache = webdriverio.remote(optionNoCache1);
    client1withCache = webdriverio.remote(optionWithCache1);

    client2WithoutCache = webdriverio.remote(optionNoCache2);
    client2WithCache = webdriverio.remote(optionWithCache2);

    clientNativeCache = webdriverio.remote(optionNativeCache);
    clientUpgradeCache = webdriverio.remote(optionUpgradeCache);
    this.timeout(120000);
  });

  after(async function () {
    this.timeout(120000);
    await manageDeviceAllocation.deallocateAndroid1Device();
    await manageDeviceAllocation.deallocateAndroid2Device();
    
  });
  
  describe('Validating landing page', function () {
      let signupPage;
      before(async function () {
        this.timeout(120000);
        signupPage = new SignupPageTest(client1WithoutCache);
        await client1WithoutCache.init();
      });
  
      after(async function () {
        this.timeout(120000);
        await manageDeviceAllocation.deallocateAndroid1Device();
        await manageDeviceAllocation.deallocateAndroid2Device();
      });

      it('validate', async function () {
        this.timeout(waitTime);
        await signupPage.ensureDeliveryListPageExist();
        await signupPage.ensureDeliveryDocs();
        await signupPage.clickOnDeliveryButton();
        await signupPage.ensureStartButtonExistDel();
        await signupPage.ensureBackButtonExist();
        await signupPage.ensureDeliButtonExist();
        await signupPage.clickOnDelAlan();
        await signupPage.ensureDelveryDetailExist();
        await signupPage.clickOnBackButton();
        await signupPage.ensureDeliveryLuButtonExist();
        await signupPage.clickOnDeliverButton();
        await signupPage.ensureDeliveryDetailExist();
        
  });
  });
