
import{expect, test as baseTest} from '@playwright/test';
import { apiHelper } from '../api/apiHelper';



type apiFixtures = {
    apihelper: apiHelper;

};

export let test = baseTest.extend<apiFixtures>({
    apihelper: async ({request},use) => {
        let apihelper = new apiHelper(
            request, 
            process.env.API_BASE_URL!
        )
        await use(apihelper);
    }
    
});

export {expect} from '@playwright/test';