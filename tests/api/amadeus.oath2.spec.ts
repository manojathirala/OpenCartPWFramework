
// import{test, expect} from '@playwright/test';

// let OATH_CONFIG  ={
//     tokenURL:'https://test.api.amadeus.com/v1/security/oauth2/token',
//     clientid:process.env.OAUTH_CLIENT_ID!,
//      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
//     grantType: process.env.GRANT_TYPE!
// }
// let accessToken:string;

// test.beforeEach('POST - to get the token',async ({request}) => {
//     let res = await request.post(OATH_CONFIG.tokenURL,{
//         form:{
//             grant_type: OATH_CONFIG.grantType,
//             client_id: OATH_CONFIG.clientid,
//             client_secret: OATH_CONFIG.clientSecret
//         }
//     })

//     expect(res.status()).toBe(200);
//     let json=await res.json();
//     accessToken = json.access_token;
// });

// test('test the actual api',async({request}) => {
//      let baseURL = 'https://test.api.amadeus.com';
//     let endPointURL = '/v1/reference-data/locations';

//     let queryParam ={
//         subType: 'CITY,AIRPORT',
//         keyword: 'MUC',
//         countryCode: 'DE'
//     };

//    let res =  await request.get(`${baseURL}${endPointURL}`,{
//     headers:{
//         Authorization: `Bearer ${accessToken}`
//     },
//     params:queryParam
//    });

//   // console.log(await res.json());
//    expect(res.status()).toBe(200);
//    let resjson= await res.json();
//    console.log(resjson.data[1].iataCode);
   
// })