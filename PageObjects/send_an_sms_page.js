var FunctionLibrary = require('../HelperModule/FunctionLibrary.js')

var login_page = function() {

    /* Locators Name*/
    var phoneNumLocator = element(by.name('phone_constant'));
    var msgTextLocator = element(by.id('module-2')).element(by.name('message_phrase[]'));

    /* Locators Name*/
    var phoneNumName = "Phone Number";
    var msgTextName = "Mesage Text"

    /* Action that can be performed specific to this page */
    this.enterPhoneNumber = function(value) {
        FunctionLibrary.sendKeys(phoneNumLocator, value, phoneNumName)
    };
    this.enterMessageText = function(value) {
        FunctionLibrary.sendKeys(msgTextLocator, value, msgTextName)
    };
    this.waitForSMSDialogToAppear = function() {
        FunctionLibrary.waitForElementToBeVisible(phoneNumLocator, 10, phoneNumName)
    }
};
module.exports = new login_page();