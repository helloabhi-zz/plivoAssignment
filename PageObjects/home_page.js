var FunctionLibrary = require('../HelperModule/FunctionLibrary.js')

var home_page = function() {

    /* Locators */
    var getStartedLocator = element(by.buttonText("Let's get started!"));
    var newPageLocator = element(by.id('add-page'));
    var pageNameInputLocator = element(by.id('create-dialog')).element(by.name('name'));
    var createPageLocator = element.all(by.buttonText('Create')).get(1);
    var messagingLocator = element(by.linkText('Messaging'));
    var basicLocator = element(by.linkText('Basic'))
    var shareAnSMSLocator = element.all(by.css('.module-group')).get(3).all(by.tagName('li')).get(2);
    var shareAnEmailLocator = element.all(by.css('.module-group')).get(3).all(by.tagName('li')).get(1);
    var exitAppLocator = element.all(by.css('.module-group')).get(0).all(by.tagName('li')).get(0);
    var mainScreenLocator = element(by.id('tabs-2'))
    var startConnectorLocator = element(by.id('module-1')).element(by.css('.syn-node'));
    var smsReceptorLocator = element(by.id('module-2')).element(by.css('.syn-receptor-draggable'));
    var smsWestConnectorLocator = element(by.id('module-2')).element(by.css('.syn-node-attached-w'));
    var smsEastConnectorLocator = element(by.id('module-2')).element(by.css('.syn-node-attached-e'));
    var mailReceptorLocator = element(by.id('module-3')).element(by.css('.syn-receptor-draggable'));
    var mailWestConnectorLocator = element(by.id('module-3')).element(by.css('.syn-node-attached-w'));
    var mailEastConnectorLocator = element(by.id('module-3')).element(by.css('.syn-node-attached-e'));
    var exit1ReceptorLocator = element(by.id('module-4')).element(by.css('.syn-receptor-draggable'));
    var exit2ReceptorLocator = element(by.id('module-5')).element(by.css('.syn-receptor-draggable'));
    var exit3ReceptorLocator = element(by.id('module-6')).element(by.css('.syn-receptor-draggable'));

    /* Locators Name*/
    var getStartedName = "Lets Get Started";
    var newPageName = "New Page";
    var pageNameInputName = "Page Name";
    var createPageName = "Create";
    var messagingName = "Messaging"
    var basicName = "Basic"
    var shareAnSMSName = "Share An SMS"
    var shareAnEmailName = "Share An Email"
    var exitAppName = "Hang up or Exit"
    var mainScreenName = "Main Screen"
    var startConnectorName = "Start App Connector";
    var smsReceptorName = "SMS Receptor";
    var smsWestConnectorName = "SMS West Connector";
    var smsEastConnectorName = "SMS East Connector";
    var mailReceptorName = "Email Receptor";
    var mailWestConnectorName = "Email West Connector"
    var mailEastConnectorName = "Email East Connector"
    var exit1ReceptorName = "Hang up or Exit1 Receptor"
    var exit2ReceptorName = "Hang up or Exit2 Receptor"
    var exit3ReceptorName = "Hang up or Exit3 Receptor"

    /* Action that can be performed specific to this page */
    this.clickOnGetStarted = function() {
        FunctionLibrary.click(getStartedLocator, getStartedName)
    };
    this.clickOnNewPage = function() {
        FunctionLibrary.click(newPageLocator, newPageName)
    };
    this.sendPageNameInput = function(value) {
        FunctionLibrary.sendKeys(pageNameInputLocator, value, pageNameInputName)
    };
    this.clickOnCreatePage = function() {
        FunctionLibrary.click(createPageLocator, createPageName)
    };
    this.clickOnMessaging = function() {
        FunctionLibrary.click(messagingLocator, messagingName)
    };
    this.clickOnBasic = function() {
        FunctionLibrary.click(basicLocator, messagingName)
    };
    this.dragAndDropExitApp = function(location, locationName) {
        FunctionLibrary.dragAndDrop(exitAppLocator, location, exitAppName, locationName)
    };
    this.dragAndDropSMS = function() {
        FunctionLibrary.dragAndDrop(shareAnSMSLocator, mainScreenLocator, shareAnSMSName, mainScreenName)
        FunctionLibrary.dragAndDrop(shareAnSMSLocator, mainScreenLocator, shareAnSMSName, mainScreenName)
    };
    this.dragAndDropEmail = function(location, locationName) {
        FunctionLibrary.dragAndDrop(shareAnEmailLocator, location, shareAnEmailName, locationName)
    };
    this.connectStartWithSMSReceptor = function() {
        FunctionLibrary.dragAndDrop(startConnectorLocator, smsReceptorLocator, startConnectorName, smsReceptorName)
    };
    this.connectSMSNotSentWithMailReceptor = function() {
        FunctionLibrary.dragAndDrop(smsEastConnectorLocator, mailReceptorLocator, smsEastConnectorName, mailReceptorName)
    };
    this.connectSmsSentWithExitReceptor = function() {
        FunctionLibrary.dragAndDrop(smsWestConnectorLocator, exit1ReceptorLocator, smsWestConnectorName, exit1ReceptorName)
    };
    this.connectMailSentWithExitReceptor = function() {
        FunctionLibrary.dragAndDrop(mailEastConnectorLocator, exit2ReceptorLocator, mailEastConnectorName, exit2ReceptorName)
    };
    this.connectMailNotSentWithExitReceptor = function() {
        FunctionLibrary.dragAndDrop(mailWestConnectorLocator, exit3ReceptorLocator, mailWestConnectorName, exit3ReceptorName)
    };


}
module.exports = new home_page();