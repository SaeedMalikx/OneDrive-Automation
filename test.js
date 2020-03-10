const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

const Login = require("./pages/login")
const Dashboard = require("./pages/dashboard")
const Edit = require("./pages/edit")
const Utilities = require("./utilities")


//provide your download path to where the file is expected to download, usually downloads folder
const downloadOriginal = "C:/Users/YOURUSERNAME/Downloads/one.txt"
const downloadEdited = "C:/Users/YOURUSERNAME/Downloads/one (1).txt"

const cwd = process.cwd()
const oneByte = "/textfiles/one.txt"
const zeroByte = "/textfiles/zero.txt"


describe('OneDrive Automation', function() {
    let driver
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://onedrive.live.com/about/en-us/signin/');
    });
    after(async function() {
        driver.quit()
    });

  
    it('Succesfully logs into OneDrive using the credentials provided', async () => {
        const login = new Login(driver)
        login.switchFrame();
        await login.enterUsername("smodautomation@outlook.com")
        await login.enterPassword("onedrivetest123")
        await driver.sleep(5000)
        const dashboard = new Dashboard(driver)
        let pageTitle = await dashboard.checkTitle()
        assert.equal(pageTitle, 'My files - OneDrive', "Did Not Log in"); 
               
    })
    
    it('0 Byte .txt file upload and subsequent failure', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.uploadFile(cwd + zeroByte)
        let status0 = await dashboard.checkStatus()
        await driver.sleep(3000)
        console.log(status0)
        let statusBoolean = status0.includes("item wasn't uploaded")
        assert.equal(statusBoolean, true, "Item was uploaded"); 
    })
    it('1 Byte .txt file upload', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.uploadFile(cwd + oneByte)
        let status1 = await dashboard.checkStatus()
        await driver.sleep(3000)
        console.log(status1)
        let statusBoolean = status1.includes("Uploading 1 item")
        assert.equal(statusBoolean, true, "Item wasn't uploaded"); 
    })
    it('Check Metadata of the uploaded file', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.checkInfo("one.txt")
        let verifyMeta = await dashboard.checkMetadata()
        console.log(verifyMeta)
        let verifyMetaBoolean = verifyMeta.includes("1 byte")
        assert.equal(verifyMetaBoolean, true, "Metadata is not matching")
    })
    it('Reupload 1 Byte .txt file and subsequent failure', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.uploadFile(cwd + oneByte)
        await driver.sleep(3000)
        let status1 = await dashboard.checkStatus()
        console.log(status1)
        let statusBoolean = status1.includes("Replace")
        assert.equal(statusBoolean, true, "File was uploaded"); 

    })
    it('Download the original file and verify', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.downloadFile("one.txt")
        const utilities = new Utilities()
        let data = utilities.checkFileContents(downloadOriginal)
        console.log(data)
        assert.equal(data, "1", "Original File Contents Not Matching"); 
        
    })
    
    it('Open and Edit The Uploaded File', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.openFileInEditor("one.txt")
        const edit = new Edit(driver)
        let title = await edit.checkTitle()
        console.log(title)
        await edit.write()
        await edit.saveFile()
        await dashboard.switchToDashboard()
    })

    it('Download the new edited file and verify', async () => {
        const dashboard = new Dashboard(driver)
        await dashboard.downloadFile("one.txt")
        const utilities = new Utilities()
        let dataEdited = utilities.checkFileContents(downloadEdited)
        let dataOriginal = utilities.checkFileContents(downloadOriginal)
        console.log(dataEdited)
        utilities.deleteFile(downloadOriginal)
        utilities.deleteFile(downloadEdited)
        assert.equal(dataEdited, "11111", "Edited File Contents Not Matching"); 
        assert.notEqual(dataEdited, dataOriginal)
        
    })

    it('Delete the uploaded file from OneDrive', async () => {
        const dashboard = new Dashboard(driver)
        await driver.sleep(2000)
        await dashboard.deleteFile("one.txt")
        await driver.sleep(3000)
        let statusD = await dashboard.checkStatus()
        console.log(statusD)
        let statusBoolean = statusD.includes("Deleted 1 item")
        assert.equal(statusBoolean, true, "Item wasn't Deleted"); 
    })
    
});

