
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCart extends BasePage{
    private readonly couponDropdown:Locator;
    private readonly couponTextBox:Locator;
    private readonly applyCoupon:Locator;
    private readonly couponAlert:Locator;

    constructor(page: Page){
        super(page);
        this.couponDropdown= page.getByRole('link',{name:'Use Coupon Code'});
        this.couponTextBox = page.getByRole('textbox',{name:'Enter your coupon here'});
        this.applyCoupon = page.getByRole('button',{name:'Apply Coupon'});
        this.couponAlert = page.locator('div.alert');
    }

    async clickCouponDrop(){
        await this.couponDropdown.click();
    }

    async textCoupon(text:string){
        await this.couponTextBox.fill(text);
    }

    
    async applyCouponCode(){
        //await this.applyCoupon.hover();
        await this.applyCoupon.click();
        await this.page.waitForTimeout(3000);
    }
    async alertCoupon():Promise<string>{
        return await this.couponAlert.innerText();
    }
}