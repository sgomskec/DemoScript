import path from 'path';

const logger = require('../logger');
const chai = require('chai');

const SCEENSHOT_FILETYPE = '.png';
const UNSUCCESSFULL_MESSAGE = 'webelement not available = ';
const RETRY_DEFAULT = 5;

class BasePage {
  constructor(client) {
    this.client = client;
  }

  
  async saveScreenshot(name) {
    const screenShotFolderLocation = '../../../../results/screenShots/';
    const getTimeStamp = new Date().toLocaleString();
    const screenshotPath = path.join(__dirname, screenShotFolderLocation);
    const fileName = `${getTimeStamp}_${name}`;
    await this.client.saveScreenshot(screenshotPath + fileName + SCEENSHOT_FILETYPE);
  }

  async executeWithErrorHandling(fn, errorMsg) {
    try {
      await fn();
    } catch (ex) {
      logger.projectLog(errorMsg, 'error');
      await this.saveScreenshot(errorMsg);
      chai.assert.isOk(false, errorMsg);
    }
  }

  async clickOn(locator) {
    const errorMsg = UNSUCCESSFULL_MESSAGE + locator;
    await this.executeWithErrorHandling(async () => {
      await this.client.waitForExist(locator, 20000);
      await this.client.click(locator);
    }, errorMsg);
    await this.pauseForInSeconds(1);
  }

  async ensureElementExist(locator) {
    const errorMsg = UNSUCCESSFULL_MESSAGE + locator;
    await this.executeWithErrorHandling(async () => {
      await this.client.waitForExist(locator, 20000);
    }, errorMsg);
    await this.pauseForInSeconds(1);
  }

  async inputValue(locator, value) {
    const errorMsg = UNSUCCESSFULL_MESSAGE + locator;
    await this.executeWithErrorHandling(async () => {
      await this.client.waitForExist(locator, 20000);
      await this.client.setValue(locator, value);
    }, errorMsg);
    await this.pauseForInSeconds(1);
  }

  async isElementExist(locator) {
    const locatorVisibility = await this.client.isVisible(locator);
    return locatorVisibility;
  }

  async ensureElementNotExist(locator, retryCount = RETRY_DEFAULT) {
    let counter = 0;
    const errorMsg = `Element ${locator} still Exist.`;
    await this.executeWithErrorHandling(async () => {
      do {
        const locatorVisibility = await this.client.isVisible(locator);
        if (locatorVisibility === true && counter < retryCount) {
          await this.pauseForInSeconds(1);
          counter += 1;
        } else if (locatorVisibility === false) {
          break;
        } else if (locatorVisibility === true && counter === retryCount) {
          chai.assert.strictEqual(locatorVisibility, false, errorMsg);
        }
      } while (counter <= retryCount);
    }, errorMsg);
  }

  async swipeUp() {
    const errorMsg = 'swipe failed.';
    await this.executeWithErrorHandling(async () => {
      await this.client.touchAction([{ action: 'press', x: 216, y: 1146 }, { action: 'wait', ms: 1000 }, { action: 'moveTo', x: 216, y: 810 }, 'release']);
    }, errorMsg);
  }

  async swipeDown() {
    const errorMsg = 'swipe failed.';
    await this.executeWithErrorHandling(async () => {
      await this.client.touchAction([{ action: 'press', x: 336, y: 573 }, { action: 'wait', ms: 1000 }, { action: 'moveTo', x: 336, y: 1205 }, 'release']);
    }, errorMsg);
  }
  
  async swipeLeft() {
    const errorMsg = 'swipe failed.';
    await this.executeWithErrorHandling(async () => {
      await this.client.touchAction([{ action: 'press', x: 789, y: 1086 }, { action: 'moveTo', x: 189, y: 1086 }, 'release']);
      await this.pauseForInSeconds(1);
    }, errorMsg);
  }
  
  async swipeRight() {
    const errorMsg = 'swipe failed.';
    await this.executeWithErrorHandling(async () => {
      await this.client.touchAction([{ action: 'press', x: 389, y: 1086 }, { action: 'moveTo', x: 789, y: 1086 }, 'release']);
      await this.pauseForInSeconds(1);
    }, errorMsg);
  }


  async pressBack() {
    await this.client.back();
    await this.pauseForInSeconds(1);
  }

  async pressBackUntilFound(locator, retryCount = RETRY_DEFAULT) {
    let counter = 0;
    const errorMsg = `Unable to find element ${locator} in this page.`;
    await this.executeWithErrorHandling(async () => {
      do {
        const elementToLookFor = await this.isElementExist(locator);
        if (elementToLookFor === false && counter < retryCount) {
          await this.client.back();
          await this.pauseForInSeconds(1);
          counter += 1;
        } else if (elementToLookFor === true) {
          break;
        } else if (elementToLookFor === false && counter === retryCount) {
          chai.assert.strictEqual(elementToLookFor, true, errorMsg);
        }
      } while (counter <= retryCount);
    }, errorMsg);
  }

  async pressBackUntilElementNotFound(locator, retryCount = RETRY_DEFAULT) {
    let counter = 0;
    const errorMsg = `Element ${locator} is still visible in this page.`;
    await this.executeWithErrorHandling(async () => {
      do {
        const elementToLookFor = await this.isElementExist(locator);
        if (elementToLookFor === true && counter < retryCount) {
          await this.client.back();
          await this.pauseForInSeconds(1);
          counter += 1;
        } else if (elementToLookFor === false) {
          break;
        } else if (elementToLookFor === true && counter === retryCount) {
          chai.assert.strictEqual(elementToLookFor, true, errorMsg);
        }
      } while (counter <= retryCount);
    }, errorMsg);
  }

  async swipeUpUntilFound(locator, retryCount = RETRY_DEFAULT) {
    let counter = 0;
    const errorMsg = `Unable to find element ${locator} in this page.`;
    await this.executeWithErrorHandling(async () => {
      do {
        const elementToLookFor = await this.isElementExist(locator);
        if (elementToLookFor === false && counter < retryCount) {
          await this.swipeUp();
          await this.pauseForInSeconds(1);
          counter += 1;
        } else if (elementToLookFor === true) {
          break;
        } else if (elementToLookFor === false && counter === retryCount) {
          chai.assert.strictEqual(elementToLookFor, true, errorMsg);
        }
      } while (counter <= retryCount);
    }, errorMsg);
  }

  async swipeDownUntilFound(locator, retryCount = RETRY_DEFAULT) {
    let counter = 0;
    const errorMsg = `Unable to find element ${locator} in this page.`;
    await this.executeWithErrorHandling(async () => {
      do {
        const elementToLookFor = await this.isElementExist(locator);
        if (elementToLookFor === false && counter < retryCount) {
          await this.swipeDown();
          await this.pauseForInSeconds(1);
          counter += 1;
        } else if (elementToLookFor === true) {
          break;
        } else if (elementToLookFor === false && counter === retryCount) {
          chai.assert.strictEqual(elementToLookFor, true, errorMsg);
        }
      } while (counter <= retryCount);
    }, errorMsg);
  }

  async retrieveValue(locator) {
    await this.ensureElementExist(locator);
    const result = await this.client.getText(locator);
    return result;
  }

}
module.exports = BasePage;
