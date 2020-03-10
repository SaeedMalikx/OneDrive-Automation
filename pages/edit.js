const {Builder, By, Key, until, Actions} = require('selenium-webdriver');



class Edit{
    constructor (webdriver) {
        this.driver = webdriver
        this.editLine = "inputarea"
        this.selectLine = "line-numbers"
        this.saveButton = "Save"
        this.contentClass = "mtk1"
      }
    async write(){
        this.driver.sleep(3000)
        await this.driver.wait(until.elementLocated(By.className(this.selectLine)),10000);
        await this.driver.findElement(By.className(this.selectLine)).click
        //await this.driver.actions().mouseMove(div).sendKeys('test').perform()
        await this.driver.wait(until.elementLocated(By.className(this.editLine)),10000);
        await this.driver.findElement(By.className(this.editLine)).sendKeys("111")
    }

    async saveFile(){
        this.driver.sleep(3000)
        await this.driver.findElement(By.name(this.saveButton)).click()
        this.driver.sleep(3000)
       
    }

    async checkContents(){
        await this.driver.wait(until.elementLocated(By.className(this.checkContents)),10000);
        let content = await this.driver.findElement(By.className(this.checkContents)).getText()
        return content
    }
    
    async checkTitle(){
        let handles = await this.driver.getAllWindowHandles()
        await this.driver.switchTo().window(handles[1])
        await this.driver.switchTo().defaultContent();
        let title = await this.driver.getTitle();
        return title
    }


}

module.exports = Edit;