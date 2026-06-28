
import {Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductInfoPage extends BasePage{

    private readonly productHeader:Locator;
    private readonly productImg:Locator;
    private readonly productMetaData:Locator;
    private readonly productPricing:Locator;
    private readonly quantity:Locator;
    private readonly addToCart:Locator;
    private readonly alert:Locator;
    private readonly shoppingCart:Locator;
    private readonly map:Map<string,string| number>;

    constructor(page:Page){
        super(page);
        this.productHeader = page.locator('h1');
        this.productImg = page.locator('div#content li img');
        this.productMetaData = page.locator('div.col-sm-4 ul:nth-of-type(1) li');
        this.productPricing = page.locator('div.col-sm-4 ul:nth-of-type(2) li');
        this.quantity = page.getByRole('textbox',{name:'Qty'});
        this.addToCart = page.getByRole('button',{name:'Add to Cart'});
        this.alert = page.locator('div.alert.alert-success');
        this.shoppingCart = page.locator('div.alert.alert-success a:nth-of-type(2)');
        this.map =new Map<string,string |number>;
    }

    async getProdcutHeader():Promise<string>{
       return await this.productHeader.innerText();
    }

    async getImageCount(): Promise<number>{
        await this.productImg.first().waitFor({state:"visible"});
        return await this.productImg.count();
    }

    async productInfo():Promise<Map<string,string|number>>{
        this.map.set('productheader',await this.getProdcutHeader());
        this.map.set('productimages',await this.getImageCount());
        await this.getProductMetaData();
        await this.getProdcutPricing();
        return this.map;
    }

    private async getProductMetaData(){
        let metadata = await this.productMetaData.allInnerTexts();
        for(let data of metadata){
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.map.set(metaKey,metaValue);
        }
    }

    private async getProdcutPricing(){
        let metapricing =await this.productPricing.allInnerTexts();
        let productPrice = metapricing[0];
        let extaxPrice = metapricing[1].split(':')[1].trim();
        this.map.set('product price',productPrice);
        this.map.set('exTaxprice',extaxPrice);
    }

    async addQuantity(qty: string){
       await this.quantity.clear();
       await this.quantity.fill(qty);
      
    }

    async clickOnCart(): Promise<void>{
        //await this.addToCart.hover();
        await this.addToCart.click();
       
    }

    async alertText(): Promise<string>{
        return await this.alert.innerText();
    }

    async clickShoppingCart(){
        await this.shoppingCart.click();
         
    }

}