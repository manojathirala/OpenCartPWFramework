
import{test,expect} from '../src/fixtures/fix';
import { Csvhelper } from '../src/utlis/Csvhelper';

test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.enterCredentials(process.env.USERNAME!,process.env.PASSWORD!);
})


const data = Csvhelper.readCsv('src/data/product.csv');
for(let f of data){
test(`get the count of results ${f.productName}`,async({homePage,searchResultsPage})=>{
    await homePage.doSearch(f.searchKey);
    console.log(await searchResultsPage.getResultsCount());
    expect(await searchResultsPage.getResultsCount()).toBe(Number(f.resultCount));
});
}

for(let f of data){
test(`verify user able to land on product page ${f.productName}`,async({homePage,searchResultsPage,page})=>{
    await homePage.doSearch(f.searchKey);
    await searchResultsPage.selectProduct(f.productName);
    expect(await page.title()).toBe(f.productName);
});
}