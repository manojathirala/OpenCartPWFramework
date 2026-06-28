

import{test,expect} from '../src/fixtures/fix';

test.beforeEach(async ({loginPage,homePage}) => { 
        await loginPage.gotoLoginPage();
        await loginPage.enterCredentials('pwtestbatch@open.com','pw123');
})

test('verify title', async ({homePage})=>{
    let title = await homePage.getPageTitle();
    console.log(title);
    expect(title).toBe('My Account');
})

test('verfiy logout button',async ({homePage}) => {
    expect(await homePage.verifyLogoutLink()).toBeTruthy();
})

test('retrieve all headers',async ({homePage}) =>{
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