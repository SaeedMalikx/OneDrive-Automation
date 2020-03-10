const {Builder, By, Key, until} = require('selenium-webdriver');



class Dashboard{
    constructor (webdriver) {
        this.driver = webdriver,
        this.upload = "commandFileInput"
        this.statusCheck = "OperationMonitor"
        this.metaClass = "InfoPane-itemDetails-sizeAndDate"
        this.deleteButton = "Delete"
        this.editFileButton = "Open in Text Editor"
        this.downloadButton = "Download"
      }
    async uploadFile(path){
        await this.driver.navigate().refresh();
        await this.driver.sleep(5000)
        await this.driver.findElement(By.className(this.upload)).sendKeys(path)
    }
    async checkStatus(){
        await this.driver.wait(until.elementLocated(By.className(this.statusCheck)),10000);
        let statusError = await this.driver.findElement(By.className(this.statusCheck)).getText()
        this.driver.sleep(3000)
        return statusError
    }
    async checkInfo(fileName){
        await this.driver.navigate().refresh();
        await this.driver.sleep(5000)
        await this.driver.findElement(By.name("Details")).click()
        await this.driver.sleep(2000)
        await this.driver.findElement(By.xpath("//*[@data-automationid ='" + fileName + "']/span")).click()
        await this.driver.sleep(2000)
        
    }
    async checkMetadata(){
        
        await this.driver.wait(until.elementLocated(By.className(this.metaClass)),10000);
        let metaData = await this.driver.findElement(By.className(this.metaClass)).getText()
        return metaData
    }

    async deleteFile(fileName){
        await this.driver.navigate().refresh();
        await this.driver.sleep(2000)
        await this.driver.findElement(By.xpath("//*[@data-automationid ='" + fileName + "']/span")).click()
        await this.driver.wait(until.elementLocated(By.name(this.deleteButton)),10000);
        await this.driver.findElement(By.name(this.deleteButton)).click()
        this.driver.sleep(4000)
    }

    async downloadFile(fileName){
        await this.driver.navigate().refresh();
        await this.driver.sleep(5000)
        await this.driver.findElement(By.xpath("//*[@data-automationid ='" + fileName + "']/span")).click()
        await this.driver.wait(until.elementLocated(By.name(this.downloadButton)),10000);
        await this.driver.findElement(By.name(this.downloadButton)).click()
        await this.driver.sleep(5000)
    }


    async openFileInEditor(fileName){
        await this.driver.navigate().refresh();
        await this.driver.sleep(5000)
        await this.driver.findElement(By.xpath("//*[@data-automationid ='" + fileName + "']/span")).click()
        await this.driver.wait(until.elementLocated(By.name(this.editFileButton)),10000);
        await this.driver.findElement(By.name(this.editFileButton)).click()
    }
    async checkTitle(){
        await this.driver.switchTo().defaultContent();
        let title = await this.driver.getTitle();
        return title
    }
    

    async switchToDashboard(){
        let handles = await this.driver.getAllWindowHandles()
        await this.driver.switchTo().window(handles[0])
        await this.driver.switchTo().defaultContent();
    }

}

module.exports = Dashboard;