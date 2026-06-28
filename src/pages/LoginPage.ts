import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly forgotpassword: Locator;
    private readonly button: Locator;
     private readonly loginErrorMessage: Locator;
     private readonly registerButton: Locator;

    constructor(page: Page){
        super(page);
        this.username = page.getByRole('textbox',{name:'E-Mail Address'});
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.forgotpassword = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.button = page.getByRole('button', { name: 'Login' });
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerButton = page.getByRole('link',{name:'Register'});
    }

    async gotoLoginPage(): Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async validateForgot(): Promise<boolean>{
        return await this.forgotpassword.isVisible();
    }

    async enterCredentials(username: string,password:string){
       
        await this.username.fill(username);
        await this.password.fill(password);
        await this.button.click();
       
    }

      async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
    }

    async clickOnRegisterButton(): Promise<void> {
         await this.registerButton.isVisible();
         await this.registerButton.click();
    }

}