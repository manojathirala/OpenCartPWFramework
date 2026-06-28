import{test,expect} from '../src/fixtures/fix';
import { Csvhelper } from '../src/utlis/Csvhelper';


test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.enterCredentials(process.env.USERNAME!,process.env.PASSWORD!);
})



test('get the count of results ',async({homePage,productInfoPage,searchResultsPage})=>{
            await homePage.doSearch('macbook');
            await searchResultsPage.selectProduct('MacBook Pro');
            expect(await productInfoPage.getImageCount()).toBe(4);
            expect(await productInfoPage.isLogoVisible()).toBeTruthy();
            let c = await productInfoPage.getPageFootersCount();
            console.log(c);
});

test('get the metadata of the product ',async({homePage,productInfoPage,searchResultsPage})=>{
            await homePage.doSearch('macbook');
            await searchResultsPage.selectProduct('MacBook Pro');
            let datas =await productInfoPage.productInfo();
            console.log('actual data:',datas);
            expect.soft(datas.get('productheader')).toBe('MacBook Pro');
            expect.soft(datas.get('Brand')).toBe('Apple');
            expect.soft(datas.get('Reward Points')).toBe('800');
});

//above test using csv with two sets of data
let data = Csvhelper.readCsv('src/data/productinfo.csv');

for(let f of data){
test(`metadata from csv ${f.product}`,async({homePage,productInfoPage,searchResultsPage})=>{
            await homePage.doSearch(f.searchkey);
            await searchResultsPage.selectProduct(f.product);
            let datas =await productInfoPage.productInfo();
            console.log('actual data:',datas);
            expect.soft(datas.get('productheader')).toBe(f.product);
            expect.soft(datas.get('Brand')).toBe(f.brand);
            expect.soft(datas.get('product price')).toBe(f.productPrice);
});
}

test('add quantity',async({homePage,productInfoPage,searchResultsPage})=>{
            await homePage.doSearch('macbook');
            await searchResultsPage.selectProduct('MacBook Pro');
            await productInfoPage.addQuantity('2');
            await productInfoPage.clickOnCart();
            const t =await productInfoPage.alertText();
            console.log(t);
            await productInfoPage.clickShoppingCart();
});