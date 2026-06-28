

import{expect, test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { Csvhelper } from '../utlis/Csvhelper';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';
import { ShoppingCart } from '../pages/ShoppingCart';


type pageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    homePage: HomePage;
    registerPage:RegisterPage;
    testData: Record<string,string>[];
    searchResultsPage:SearchResultsPage;
    productInfoPage:ProductInfoPage;
    shoppingCartPage:ShoppingCart;
};

export let test =baseTest.extend<pageFixtures>({

    basePage: async({page}, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },
    loginPage: async({page}, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async({page}, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registerPage: async({page}, use) => {
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    testData: async({}, use) => {
        let testData = Csvhelper.readCsv('src/data/loginData.csv');
        await use(testData);
    },
    searchResultsPage: async({page}, use) => {
        let searchResultspage = new SearchResultsPage(page);
        await use(searchResultspage);
    },
     productInfoPage: async({page}, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
    shoppingCartPage: async({page}, use) => {
        let shoppingCartPage = new ShoppingCart(page);
        await use(shoppingCartPage);
    }

})

export {expect} from '@playwright/test';
