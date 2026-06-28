
import { test,expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.enterCredentials('pwtestbatch@open.com','pw123');
        homePage = new HomePage(page);
})

test('verify title', async ({})=>{
    let title = await homePage.getPageTitle();
    console.log(title);
    expect(title).toBe('My Account');
})

test('verfiy logout button',async ({}) => {
    expect(await homePage.verifyLogoutLink()).toBeTruthy();
})

test('retrieve all headers',async ({}) =>{
    let all = await homePage.verifyheaders();
    console.log(all);
    expect(all).toHaveLength(4);
    expect(all).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
})