const BasePage = require('../../utils/baseClass/mobileBaseClass');

const deliverydocstoandrio = '//android.widget.TextView[@text="Deliver documents to Andrio"]';
const deliverylistpage = '//android.widget.TextView[@text="Delivery List"]';
const DeliverpetstoAlan = '//android.widget.TextView[@text="Deliver pets to Alan"]';
const DelivertoystoLuqmano = '//android.widget.TextView[@text="Deliver toys to Luqman"]';
const DeliveryDetail = '//android.widget.TextView[@text="Delivery Detail"]';
const backbutton = '//android.widget.ImageButton[@content-desc="Navigate up"]';

class LandingPage extends BasePage {

  async ensureDeliveryListPageExist() {
    await this.ensureElementExist(deliverylistpage);
  }
  async ensureDeliveryDocs() {
    await this.ensureElementExist(deliverydocstoandrio);
  }
  async clickOnDeliveryButton() {
    await this.clickOn(deliverydocstoandrio);
  }
  async ensureStartButtonExistDel() {
    await this.ensureElementExist(DeliveryDetail);
  }
  async ensureBackButtonExist() {
    await this.ensureElementExist(backbutton);
  }
  async ensureDeliButtonExist() {
    await this.ensureElementExist(DeliverpetstoAlan);
  }
  async clickOnDelAlan() {
    await this.clickOn(DeliverpetstoAlan);
  }
  async ensureDelveryDetailExist() {
    await this.ensureElementExist(DeliveryDetail);
  }
  async clickOnBackButton() {
    await this.clickOn(backbutton);
  }
  async ensureDeliveryLuButtonExist() {
    await this.ensureElementExist(DelivertoystoLuqmano);
  }
  async clickOnDeliverButton() {
    await this.clickOn(DelivertoystoLuqmano);
  }
  async ensureDeliveryDetailExist() {
    await this.ensureElementExist(DeliveryDetail);
  }
}
module.exports = LandingPage;
