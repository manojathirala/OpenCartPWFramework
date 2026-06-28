

import{test,expect} from '../src/fixtures/fix';
import { Csvhelper } from '../src/utlis/Csvhelper';


test.beforeEach('go to loginpage',async({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.clickOnRegisterButton();
})

let testData = Csvhelper.readCsv('src/data/registerForm.csv')
for(let f of testData){
test(`fill the registration form - ${f.firstName}`,async ({registerPage},page) => {
    await registerPage.fillFirstName(f.firstName);
    await registerPage.fillLastName(f.lastName);
    await registerPage.fillEmail(f.email);
    await registerPage.fillTelephone(f.telephone);
    await registerPage.fillPassword(f.password);
    await registerPage.fillConfirmPassword(f.password);
    await registerPage.clickRadio(f.radio);
    await registerPage.clickCheckBox();
    await registerPage.clickContinue();
});
}
