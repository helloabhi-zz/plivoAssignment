var FunctionLibrary = require('../HelperModule/FunctionLibrary.js')

var login_page = function() {

    var createAppLocator = element(by.id('link-create'))

    var createAppName = "Create an App"
    
    this.clickOnCreateAnAppButton = function () {
        FunctionLibrary.click(createAppLocator, createAppName)
    }  
};
module.exports = new login_page();