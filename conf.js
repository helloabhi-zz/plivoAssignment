'use strict';
var log4js = require('log4js');
var fs = require('fs');
//var HtmlReporter = require('protractor-html-screenshot-reporter');
exports.config = {
    // this bunch of code is used to delete the existing application log before test begins
    beforeLaunch: function() {
        if (fs.existsSync('./logs/file.log')) {
            fs.unlink('./logs/file.log')
        }
    },
    //directConnect: true,

    capabilities: {
        browserName: 'chrome',
        // version: "",
        // platform: "ANY",
        // javascriptEnabled: true,
        // marionette: true
        // chromeOptions: {
        //     args: ["--disable-gpu"]
        // }
    },
    // baseUrl: browser.params.baseUrl,
    // 'capabilities': {
    //     'browserstack.user': 'abhishek514',
    //     'browserstack.key': 'bHU6Gw3ryDnTsfEWxVcY1',
    //     'os': 'Windows',
    //     'os_version': '10',
    //     'browserName': 'Chrome',
    //     'browser_version': '55.0',
    //     'resolution': '1024x768'
    // },
    // 
    //    Capabilities to be passed to the webdriver instance.
    // capabilities: {
    //     browserName: 'internet explorer',
    //     // firefoxPath: 'C:/Program Files (x86)/Mozilla Firefox/firefox.exe'
    // },
    //restartBrowserBetweenTests: true,
    // Framework to use, 'jasmine' by default will use the latest jasmine framework
    framework: 'jasmine',
    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['Specs/plivoSpecs.js'],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',
    // Sets the amount of time to wait for an asynchronous script to finish execution before throwing an error.
    // Also, Protractor waits until there are no pending asynchronous tasks in your Angular application
    allScriptsTimeout: 150000,
    // When navigating to a new page using browser.get, Protractor waits for the page to be loaded and the new URL to appear before continuing.
    getPageTimeout: 120000,
    // Options to be passed to Jasmine for a spec (an 'it' block) to wait for default time before throwing timeout error
    // timeout: timed out after 30000 msec waiting for spec to complete
    jasmineNodeOpts: {
        defaultTimeoutInterval: 240000,
        showColors: true
    },

    onPrepare: function() {
        // implicit and page load timeouts
        browser.manage().timeouts().setScriptTimeout(150000);
        browser.manage().timeouts().pageLoadTimeout(40000);
        browser.manage().timeouts().implicitlyWait(35000);

        var disableNgAnimate = function() {
            angular.module('disableNgAnimate', []).run([
                '$animate',
                function($animate) {
                    $animate.enabled(false);
                }
            ]);
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        // for non-angular page
        browser.ignoreSynchronization = true;
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                captureOnlyFailedSpecs: true,
                savePath: './Web_Automation_Summary',
                takeScreenShotsOnlyForFailedSpecs: true,
                cleanDestination: true,
                fileName: 'Automation_Report'
            })
        );

        setTimeout(function() {
            browser.driver.executeScript(function() {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
            }).then(function(result) {
                browser.driver.manage().window().setSize(result.width, result.height)
            });
        });


    },

}