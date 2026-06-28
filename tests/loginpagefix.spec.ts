

import{test,expect} from '../src/fixtures/fix';
import { LoginPage } from '../src/pages/LoginPage';
import { Csvhelper } from '../src/utlis/Csvhelper';
import { excelHelper } from '../src/utlis/excelHelper';
import { jsonHelper } from '../src/utlis/jsonHelper';

test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginPage();
})

test('validate forgot password', async ({ loginPage }) => {
    const pagepsswrd = await loginPage.validateForgot();
    expect(pagepsswrd).toBeTruthy();

});

test('user able to login',async({loginPage,homePage})=>{
    await loginPage.enterCredentials(process.env.USERNAME!,process.env.PASSWORD!);
    expect(await homePage.verifyLogoutLink()).toBeTruthy();
    expect(await homePage.getPageTitle()).toBe('My Account');
})


//data driven 1 way = this is not trigger 3 workers only with one worker and uses fixture concept
test('test with diff crend using csv', async({loginPage,testData}) => {
    for(let row of testData){
        await loginPage.enterCredentials(row.username,row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
})


//data drivern 2 way = without fixtures and parallel workers
let testd = Csvhelper.readCsv('src/data/loginData.csv');

for(let f of testd){
    test(`diff test ${f.username}`,async({loginPage}) => {
        await loginPage.enterCredentials(f.username,f.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
}

test('click the register button', async({loginPage}) => {
    await loginPage.clickOnRegisterButton();

});

//data drivern 2 way = without fixtures and parallel workers using excel 
//note:excel rows cannot be empty we have to provide some spaces atleast then only the excel will work.
let testdata = excelHelper.readExcel('src/data/testExcel.xlsx');

for(let f of testd){
    test(`diff tests ${f.username}`,async({loginPage}) => {
        await loginPage.enterCredentials(f.username,f.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
}


let testJsondata = jsonHelper.readJson('src/data/loginData.json');

for(let f of testJsondata){
    test(`diff test json ${f.username}, ${f.password}`,async({loginPage}) => {
        await loginPage.enterCredentials(f.username,f.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
}