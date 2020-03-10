const {Builder, By, Key, until} = require('selenium-webdriver');



class Login{
    constructor (webdriver) {
        this.driver = webdriver,
        this.usernameInput = "form-control"
        this.loginButton = "input[type='submit']"
        this.passwordInput = "i0118"
      }
    async enterUsername(username){
        await this.driver.wait(until.elementLocated(By.className(this.usernameInput)),10000);
        await this.driver.findElement(By.className(this.usernameInput)).sendKeys(username)
        await this.driver.findElement(By.css(this.loginButton)).click();
    }
    async enterPassword(password){
        await this.driver.wait(until.elementLocated(By.id(this.passwordInput)),10000);
        await this.driver.findElement(By.id(this.passwordInput)).sendKeys(password);
        await this.driver.findElement(By.css(this.loginButton)).click();
    }

    switchFrame(){

        this.driver.switchTo().frame(1)
    }
    
    async checkTitle(){
        await this.driver.switchTo().defaultContent();
        let title = await this.driver.getTitle();
        return title
    }


}

module.exports = Login;