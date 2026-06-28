
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage{
    private readonly firstName: Locator;
    private readonly lastName:Locator;
    private readonly email:Locator;
    private readonly telephone: Locator;
    private readonly password:Locator;
    private readonly confirmPassword:Locator;
    private readonly radioYes: Locator;
    private readonly radioNo:Locator;
    private readonly check:Locator;
    private readonly submitButton:Locator;

    constructor(page: Page){
        super(page);
        this.firstName = page.getByRole("textbox",{name:'First Name'});
        this.lastName = page.getByRole("textbox",{name:'Last Name'});
        this.email = page.getByRole("textbox",{name:'E-Mail'});
        this.telephone = page.getByRole("textbox",{name:'Telephone'});
        this.password = page.getByRole("textbox",{name:'Password'}).first();
        this.confirmPassword = page.getByRole("textbox",{name:'Password Confirm'});
        this.radioYes = page.getByRole("radio",{name:'Yes', exact:true});
        this.radioNo = page.getByRole("radio",{name:'No', exact:true});
        this.check = page.getByRole("checkbox");
        this.submitButton = page.getByRole("button",{name:'continue'})
    }

    async fillFirstName(firstName: string){
        await this.firstName.fill(firstName);
    }

     async fillLastName(lastName: string){
        await this.lastName.fill(lastName);
    }

     async fillEmail(email:string){
        await this.email.fill(email);
    }

     async fillTelephone(telephone: string){
        await this.telephone.fill(telephone);
    }

     async fillPassword(password: string){
        await this.password.fill(password);
    }

     async fillConfirmPassword(confirmPassword: string){
        await this.confirmPassword.fill(confirmPassword);
    }

     async clickRadio(option:string){
        if(option.toLowerCase()==='yes'){
            await this.radioYes.click();
        }else if(option.toLowerCase()==='no'){
            await this.radioNo.click();
        }
    }

     async clickCheckBox(){
        await this.check.check();
    }

      async clickContinue(){
        await this.submitButton.click();
    }
}