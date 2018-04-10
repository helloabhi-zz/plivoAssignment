var function_library = function() {

    var log4jsGen = require("../HelperModule/log4js.js");
    var logger = log4jsGen.getLogger();
    // Use the path module to resolve the full path of the file that you want to upload
    var path = require('path');

    /**
     * click(locator,name) method
     * method specification :-
     * 
     * @return {[void]} [It clicks on the locator passed as an parameter]
     * @param {[elementFinder]} [locator] [Identify the element finder by id,x-path,name,etc]
     * @param {[var]} [name] [the name of the web element where we intend to input/send values]
     * @description [locator.click(); -> Clicks on the ElementFinder(web element) targeted 
     and wait for next page to load(as it internally invokes browser.waitForAngular())]
     */

    this.click = function(locator, name) {
        logger.info('Clicking on' + name + ' field');
        locator.click().then(function() {
            logger.info('Clicked on' + name + ' field');
        }, function(error) {
            logger.error('exception occoured while clicking on' + name + 'field' + 'Stack Trace:' + error.message)
            throw new Error(error)
        })
    }

    /**
     * sendKeys(locator, value, name) method
     * method specification :-
         
     * @return {[void]} [It inputs/sends the value to the intended web element]
     * @param {[elementFinder]} [locator] [Identify the element finder by id,x-path,name,etc]
     * @param {[var]} [name] [the name of the web element where we intend to input/send values]
     * @param {[string]} [value] [the string value which we intend to input/send]
     * @description [locator.sendKeys(value) -> inputs/sends
     * the value to the intended web element]
     */

    this.sendKeys = function(locator, value, name) {
        logger.info('Sending input value to' + name + ' field');
        locator.sendKeys(value).then(function() {
            logger.info('Sent input value to' + name + ' field');
        }, function(error) {
            logger.error('exception occoured while sending input value to' + name + 'field' + 'Stack Trace:' + error.message)
            throw new Error(error)
        })
    };

    /**
    * getText(locator, name) method
    * method specification :-
        
    * @return {[promise]} [It returns a promise object that resolves to the text value of the element finder]
    * @param {[elementFinder]} [locator] [Identify the element finder by id,x-path,name,etc]
    * @param {[var]} [name] [the name of the web element where we intend to input/send values]
    * @param {[string]} [value] [the string value which we intend to input/send]
    * @description [locator.sendKeys(value) -> inputs/sends
    * the value to the intended web element]
    */

    this.getText = function(locator, name) {
        logger.info('Retrieving text from' + name + ' field');
        return new Promise(function(resolve, reject) {
            locator.getText(locator).then(function(text) {
                logger.info('Retrieved the text from' + name + ' field');
                resolve(text)
            }, function(error) {
                logger.info('exception occured while retrieving text from' + name + ' field');
                throw new Error(error)
                reject()
            })
        })
    };

    this.dragAndDrop = function(source, target, sourceName, targetName) {
        logger.info('Dragging' + sourceName + 'to' + targetName);
        //browser.actions().dragAndDrop(source, target).perform();
        browser.actions().
        mouseDown(source).
        mouseMove(target).
        mouseUp().
        perform();
        browser.sleep(3000)
        logger.info('Dragged' + sourceName + 'to' + targetName);
    }

    this.waitForElementToBeVisible = function(locator, maxWaitTime, eleName) {
        var until = protractor.ExpectedConditions;
        browser.wait(until.visibilityOf(locator), maxWaitTime, 'Exception came while waiting for' + eleName + 'element to load');
    }

    this.getAttributeValue = function(locator, name) {
        logger.info('Retrieving text from' + name + ' field');
        return new Promise(function(resolve, reject) {
            locator.getAttribute('value').then(function(text) {
                logger.info('Retrieved the text from' + name + ' field');
                resolve(text)
            }, function(error) {
                logger.info('exception occured while retrieving text from' + name + ' field');
                throw new Error(error)
                reject()
            })
        })
    };

    this.getDropdownAttributeValue = function(locator, name) {
        logger.info('Retrieving text from' + name + ' field');
        return new Promise(function(resolve, reject) {
            locator.element(by.css('option:checked')).getAttribute('label').then(function(text) {
                logger.info('Retrieved the text from' + name + ' field');
                resolve(text)
            }, function(error) {
                logger.info('exception occured while retrieving text from' + name + ' field');
                throw new Error(error)
                reject()
            })
        })
    };


    this.selectDropdownValue = function(locator, optionNum, name) {
        logger.info('Selecting value' + name + ' dropdown');
        if (optionNum) {
            var options = locator.then(function(options) {
                options[optionNum].click();
                logger.info('Selecting value' + name + ' dropdown');
            });
        }
    }
    this.selectDropdownByValue = function(locator, val, name) {
        logger.info('Selecting value' + name + ' dropdown');
        locator.$('[value="' + val + '"]').click().then(function() {
            logger.info('Clicked on' + name + ' field');
        }, function(error) {
            logger.error('exception occoured while clicking on' + name + 'field' + 'Stack Trace:' + error.message)
            throw new Error(error)
        })
    }

    this.getAllTheTextOfSelectDropdown = function(locator, eleName) {
        var list = [];
        logger.info('Fetching all the text present in the' + eleName + '  dropdown');
        return locator.each(function(elem, index) {
            return elem.getText().then(function(text) {
                list.push(text);
            })
        }).then(function() {
            logger.info('Fetched all the text present in the' + eleName + '  dropdown');
            return list
        })
    }

}
module.exports = new function_library();