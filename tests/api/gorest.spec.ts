
// import{test,expect } from '@playwright/test';

// let AUTH_TOKEN = {Authorization:'Bearer a4203e87f2f8aae4b52c3fc4d7c7841fbac3ea5102b580edd88cc96d2612d0d8'};

// test('get the all users', async({request}) => {

//     let response = await request.get('https://gorest.co.in/public/v2/users/8501981',{
//         headers:AUTH_TOKEN
//     });

//     let jsonr = await response.json();
//     console.log(jsonr);
//     console.log(response.status());
//     console.log(response.statusText());
// });


// test('create a user', async({request}) =>{
//     let userdata ={
//         name:'surya',
//         email:'surya124@gmail.com',
//         gender:'male',
//         status:'active'
//     }

//     let response = await request.post('https://gorest.co.in/public/v2/users',{
//         headers:AUTH_TOKEN,
//         data:userdata
//     });

//     let body = await response.json();
//     console.log(body);
//     console.log(response.status());
// });

// test('update the user',async({request}) => {
//     let updatedata = {
//         name:'kumar',
//         email:'kumar123@email.com',
//         gender:'male',
//         status:'active'
//     }

//     let response = await request.put('https://gorest.co.in/public/v2/users/8505916',{
//         headers:AUTH_TOKEN,
//         data:updatedata
//     });

//     let res = await response.json();
//     console.log(res);
// })

// test('delete the user',async({request}) =>{
//     let response = await request.delete('https://gorest.co.in/public/v2/users/8505916',{
//         headers:AUTH_TOKEN
//     })

//     //let res = await response.json();
//     //console.log(res);

//     console.log(response.status());
// })