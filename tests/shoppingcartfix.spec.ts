
import{test,expect} from '../src/fixtures/fix';

test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.enterCredentials(process.env.USERNAME!,process.env.PASSWORD!);
})

test('shopping cart coupon',async({homePage,productInfoPage,searchResultsPage,shoppingCartPage}) => {
         await homePage.doSearch('macbook');
         await searchResultsPage.selectProduct('MacBook Pro');
         await productInfoPage.addQuantity('2');
        await productInfoPage.clickOnCart();
        const t =await productInfoPage.alertText();
        console.log(t);
        await productInfoPage.clickShoppingCart();
        await shoppingCartPage.clickCouponDrop();
        await shoppingCartPage.textCoupon('manoj');
        await shoppingCartPage.applyCouponCode();
        let cl =await shoppingCartPage.alertCoupon();
        console.log(cl);

})