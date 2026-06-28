
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    private readonly logout: Locator;
    private readonly headers: Locator;
  
  
   

    constructor(page: Page){
        super(page);
        this.logout = page.getByRole('link',{name:'Logout'});
        this.headers = page.getByRole('heading',{level:2});
       
    }

    async verifyLogoutLink(): Promise<boolean>{
        
       return await this.logout.isVisible();
    }

    async verifyheaders():Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchKey:string){
         await this.searchBox.fill(searchKey);
         await this.searchIcon.click();
    }

}