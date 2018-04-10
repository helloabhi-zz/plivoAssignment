var FunctionLibrary = require('../HelperModule/FunctionLibrary.js')

var login_page = function() {

    var smtpHostLocator = element(by.id('module-3')).element(by.name('smtp_url'));
    var portLocator = element(by.id('module-3')).element(by.name('port'));
    var usernameLocator = element(by.id('module-3')).element(by.name('username'));
    var passwordLocator = element(by.id('module-3')).element(by.name('password'));
    var fromLocator = element(by.id('module-3')).element(by.name('from_constant'));
    var toLocator = element(by.id('module-3')).element(by.name('to_constant'));
    var subjectLocator = element(by.id('module-3')).element(by.name('subject_constant'));
    var msgTextLocator = element(by.id('module-3')).element(by.name('message_phrase[]'));


    var smtpHostName = "SMTP Host";
    var porttName = "Port"
    var usernameName = "Mesage Text"
    var passwordName = "Mesage Text"
    var fromName = "Mesage Text"
    var toName = "Mesage Text"
    var subjectName = "Mesage Text"
    var msgTextName = "Mesage Text"

    this.enterSMTPHost = function(value) {
        FunctionLibrary.sendKeys(smtpHostLocator, value, smtpHostName)
    };
    this.enterPort = function(value) {
        FunctionLibrary.sendKeys(portLocator, value, porttName)
    };
    this.enterUsername = function(value) {
        FunctionLibrary.sendKeys(usernameLocator, value, usernameName)
    };
    this.enterPassword = function(value) {
        FunctionLibrary.sendKeys(passwordLocator, value, passwordName)
    };
    this.enterFromAddress = function(value) {
        FunctionLibrary.sendKeys(fromLocator, value, fromName)
    };
    this.enterToAddress = function(value) {
        FunctionLibrary.sendKeys(toLocator, value, toName)
    };
    this.enterMailSubject = function(value) {
        FunctionLibrary.sendKeys(subjectLocator, value, subjectName)
    };
    this.enterMsgText = function(value) {
        FunctionLibrary.sendKeys(msgTextLocator, value, msgTextName)
    };
    this.waitForEmailDialogToAppear = function() {
        FunctionLibrary.waitForElementToBeVisible(smtpHostLocator,10,smtpHostName)
    }
};
module.exports = new login_page();