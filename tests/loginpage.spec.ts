

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPge:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page}) => {
     loginPge =new LoginPage(page);
    await loginPge.gotoLoginPage();
    homePage = new HomePage(page);

})

test('validate forgot password', async ({  }) => {
    const pagepsswrd = await loginPge.validateForgot();
    expect(pagepsswrd).toBeTruthy();

});

test('user able to login',async({})=>{
    await loginPge.enterCredentials('pwtestbatch@open.com','pw123');
    expect(await homePage.verifyLogoutLink()).toBeTruthy();
    expect(await homePage.getPageTitle()).toBe('My Account');
})

