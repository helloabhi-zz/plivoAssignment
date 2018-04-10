var util = require('util')
var path = require('path')
var FunctionLibrary = require('../HelperModule/FunctionLibrary.js')
var smsData = require('../TestData/sms_data.json');
var emailData = require('../TestData/email_data.json');
var login_page = require('../PageObjects/login_page.js')
var home_page = require('../PageObjects/home_page.js')
var email_page = require('../PageObjects/send_an_email_page.js')
var sms_page = require('../PageObjects/send_an_sms_page.js')
var url = null;

describe('Plivo Assignment:::', function() {
    beforeAll(function(done) {
        browser.get('http://quickfuseapps.com/');
        done();
    });
    
    it('perform the steps as per the assignment', function() {
        login_page.clickOnCreateAnAppButton();
        home_page.clickOnGetStarted();
        home_page.clickOnNewPage();
        home_page.sendPageNameInput('Test Page');
        home_page.clickOnCreatePage();
        home_page.clickOnMessaging();
        home_page.dragAndDropSMS();
        sms_page.waitForSMSDialogToAppear();
        home_page.connectStartWithSMSReceptor();
        sms_page.enterPhoneNumber(smsData[0].phoneNumber);
        sms_page.enterMessageText(smsData[0].smsText);
        home_page.dragAndDropEmail({x: 1000, y: 0}, 'x-axis:1000,y-axis:0');
        email_page.waitForEmailDialogToAppear();
        home_page.connectSMSNotSentWithMailReceptor();
        email_page.enterSMTPHost(emailData[0].smtp);
        email_page.enterPort(emailData[0].port);
        email_page.enterUsername(emailData[0].username);
        email_page.enterPassword(emailData[0].password);
        email_page.enterFromAddress(emailData[0].fromAddress);
        email_page.enterToAddress(emailData[0].toAddress);
        email_page.enterMailSubject(emailData[0].subject);
        email_page.enterMsgText(emailData[0].msgText);
        home_page.clickOnBasic();
        home_page.dragAndDropExitApp({x: 400, y: 0},'x-axis:1000,y-axis:0');
        home_page.connectSmsSentWithExitReceptor();
        home_page.dragAndDropExitApp({x: 500, y: 400},'x-axis:1000,y-axis:0');
        home_page.dragAndDropExitApp({x: 1200, y: 400},'x-axis:1000,y-axis:0');
        home_page.connectMailSentWithExitReceptor();
        home_page.connectMailNotSentWithExitReceptor();
        
    });
});