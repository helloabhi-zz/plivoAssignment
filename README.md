# plivoAssignmnet


### Installing

Installation

Install node.js, by either crack open your favourite package manager: typically apt-get install nodejs on Debian/Ubuntu Linux, brew install node on a Mac or directly from the website http://nodejs.org

Clone the repository from github:

``` ```

CD into the repository

``` $ cd plivoAssignment ```
Install the below mentioned dependencies by:

``` $ npm install -g protractor ```
``` $ npm install log4js ```

Fire up Protractor to run the tests!

``` $ protractor conf.js ```




### Design Pattern Implemented

Automation framework is a bunch of guidelines and standards, which are used to organise the code
in a meaningful way to make our life easier. Technically, it’s a generic and reusable structure created
to provide support to an entity which can potentially expand in future.
Below are the points that needs to be adhered by the framework developer, while developing a
automation framework.

1) **Do Not Repeat(DRY)**:It’s utmost important that we do not repeat same code. It’s advisable
to create a Library, which should contain all the reusable components, external connections
like database, api call etc.
So, this file will majorly contain all the WebDriverJS APIs, which is a reusable component. As
an example, below mentioned function is used to fetch all the text present in a dropdown.
As this function(which consumes WebDriverJS API) will be extensively used in most of the
places, so it is advisable to keep this in a library.
Let’s say the function is present in FunctionLibrary.js in HelperModule folder.


Ex: 1.1
```
 getAllTheTextOfSelectDropdown = function(locator, eleName) {
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
```



2) **Page Object Model(POM)**:It’s the most popular design pattern used in automation
framework designing. Page object is an object oriented class that serves as an interface
between the tests and application under test.
It contains
* *Locators*: All the locators specific to a particular page and it is assigned to a named
variable.
* *ElementName*:  All the locators present in a page is assigned a name for easy debugging,
which are to be used in the logger.
* *Methods*: All the actions that needs to be performed in a particular page needs to be
present in a particular page object.
Below mentioned example should give a better clarity.Ex: 2.1
Specs/spec.js

```
1. it('should be able to login using valid Email ID and Password and clicking on Sign In butto
n', function() {
2. Login_Page.enterEmailAddress(testData[0].emailID);
3. Login_Page.enterPassword(testData[0].password);
4. Login_Page.clickOnSignIn();
5. expect(Volunteering_Home.getPageTitle()).toEqual('p3 by NextGen -
CSR & Development Capital Management Platform');
6. });
```
PageObjects/Login_Page.js
```
1. var Login_Page = function() {
2. var emailIDLocator = element(by.model('credentials.email'));
3. var passwordLocator = element(by.model('credentials.password'));
4. var signInLocator = element(by.buttonText('Sign In'));
5. var emailIDName = "Email input box";
6. var passwordName = "Password input box";
7. var signInName = "Sign In";
8. this.enterEmailAddress = function(value) {
9. FunctionLibrary.sendKeys(emailIDLocator, value, emailIDName);
10. };
11. this.enterPassword = function(value) {
12. FunctionLibrary.sendKeys(passwordLocator, value, passwordName);
13. };
14. this.clickOnSignIn = function() {
15. FunctionLibrary.click(signInLocator, signInName); // FunctionLibrary.g
16. };
17. };
18. module.exports = new Login_Page();
```
HelperModule/FunctionaLibrary.js
```
1. this.sendKeys = function(locator, value, name) {
2. try {
3. logger.info('Sending input value to' + name + ' field');
4. locator.sendKeys(value);
5. logger.info('Sent input value to' + name + ' field');
6. } catch (err) {
7. logger.info('Error in sending input value to' + name + ' field');
8. }
9. };
10. this.click = function(locator, name) {
11. try {
12. logger.info('Clicking on' + name + ' field');
13. locator.click();
14. logger.info('Clicked on' + name + ' field');
15. } catch (err) {
16. logger.info('Error while clicking on' + name + ' field');
17. }
18. };
```
**Advantages of using this pattern correctly:**

* High Coupling(Increased Abstraction layers): Coupling can be increased if we have more
abstraction layers, which is fullfilled by page objects. The tests written in the Specs folder needs 
to only communicate with the PageObjects and the PageObjectsinreturn communicate with the
HelperModule(which contains reusable components). The advantage is that if anything in a
particular page gets changed we only need to manipulate the specific pageobject file.

* Use of Domain Specific Language(DSL):PageObjectencourages use of DSL in the specs(Tests)
file. Notice, that the test wrritten in the spec file is totally domain specific and easy to
understand by any non-technical folks.

* Make your code DRY: Use of PageObjects removes the code duplicacy as all the locators and
actions specific to a page are written in the PageObject. Now, the tests written in the Specs, just
need to communicate with the PageObjects.
Thus using this design pattern has an significant return on investment as it is highly scalable and
easy to maintain in a long run.

3) **Segregate Tests from test data**: It is advisable not to hard code the test data directly in the
tests present in the Specs folder. We can store the test data in some structured format like
excel, JSON, XML etc and retrieve the data from these files, when using it in the tests. Thus,
it is not at required to touch the tests, when we only have to manipulate the data and thus
saving our efforts.
Note: All the data specific to a page needs to be in a specific json file. This just improves the
maintainance of the code and makes it more coherant and easy to understand.
TestData/Login_Page_Data.json
```
1. [{
2. "emailID": "abhishek.sahu@nextgenpms.com",
3. "password": "********"
4. }]
```
Please refer to tests written in the Specs folder, where the emailID and password is getting read
from the above json file.
4) **Use of Logger API**: Its very important that we extensively use logger while writing the tests.
This will help immensely help in defugging any failure, when we run the tests in an browser
in a headless mode in docker. You are free to choose any logger api, if that serves your
purpose.
Please refer to Ex: 1.1, which shows the use of logger.

5) **Application independent framework**: We should never indulge in a practice of making
framework specific to a partcular application. The frameowrk build should be independent
of the application under test(AUT). Suppose, we are building the frameork for application A,
then a situation arrives that we need to automate the Application B, then we shouldn’t
make another framework for the same. Thus, it is abvisable to write generic stuffs and even 
if we need to write some stuffs specific to an application, the we can isolate it and provide
suitable comment for other to understand.
6) **Usage of proper comment**: Regardless to mention, that the codes should have proper
comments specially the reusable components i.e., WebDriverJS APIs. It should contain:
 Description of the code, which included the functionality it is testing.
 Parameters and its type that is passed in case of overloaded methods.
 Return type of the method.
Ex: 6.1 : Demostrating the comment structure for click() method present in
HelperModule/FunctionaLibrary.js(Ex: 2.1)
```
/**
 * click(locator, elemName) method
 * specification :-
 *
 *1)locator.click(); -> Clicks on the ElementFinder(web element) targeted
 and wait for next page to load(as it internally invokes browser.waitForAngular())
 * @param : Locator to locate the web element, Name of the web element
 * @return : (!webdriver.promise.Promise.<void>)A promise that will be resolved
when the click command has completed. */
```
7) **Test Creation Pattern** : Before automating any functionality, it is required to write the
manual test cases for the same. Also, we should make sure that that are tests are less
dependent upon each other.
Below points needs to be adhered to:
* *BeforeEach&AfterEach*: The pre-condition for a test case needs to be specified in the
BeforeEach function of any test framework like JASMINE, JUNIT etc
Ex:7.1: In order to test login functionality, the pre-condition is that the user needs to be in
the landing page.
Specs/spec.js
```
1. beforeEach(function() {
2. jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
3. Login_Page.navigateToLoginPage();
4. });
```
Also the stuffs that needs to be executed once the testing a particular scenario is completed
needs to be specified in the AfterEach function.
1. afterEach(function() { //clear session
2. browser.executeScript('window.sessionStorage.clear();'); //clear local storage
3. browser.executeScript('window.localStorage.clear();');
4. }); 
5. Describe& IT function: The feature(lets say Login Page Scenarios) to be tested needs to be
specified in the describe function of Jasmine. Each scenario of a particular feature needs to be
tested in a single IT function.
* The test steps that is specified in the manual test cases needs to be specifiedin the “IT”
block(This is synonymous to @Test annotation of Junit and TestNg test framework) of
Jamine framework.
The IT block should MANDATORILY match the actual outcome with the expected
outcome, using matcher function of Jasmine EXPECT. We can have more than one
assertion in a particular IT block as long as it is just verifying a single functionality.
Refer to Specs/spec.js of EX: 2.1
Note: Its an awful practice to club more than one test cases in a single IT block.

8) **Usage of Version Control**: Usage of VCS is a must as it helps in easy monitoring of changes to
the software code. There are tools like GIT, SVN etc which serves the purpose.

9) **Frameowork Structure**: It is advisable to keep like things together by building modules.
Below mentioned project structute will give a clear picture.

* All the reusable components are placed in the HelperModule folder.
* All the Page Object files across the application are placed in the PageObjects folder.
*All the tests are present in the Specs folder.
* All the test datas specific to a page are placed under TestData folder.
* Web_Automation_Summary folder contains the test result along with the screenshots.
* There is a ApplicationLogs.log contains all the logs generated when we run the suite.
* Conf.js is just a configuration file, which contains
 Browser in which the tests need to be executed.
 If we want to directly communicate with the WebDriverJS API or via selenium server
 Test framework that will be used like Jasmine, Mocha, Cucumber.
 All the different kinds of global waits and many more…..

**Note**: If we have more then one configuarion set that the test suite can be executed, we
can create multiple conf.js file and keep it in Config folder.

