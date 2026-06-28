
import{test, expect} from '../../src/fixtures/apiFix';

const TOKEN= process.env.API_Token;
const AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};
let userid: number;

test.describe.serial('grouping',() => {


//GET
test('GET API - get all users',async({apihelper}) => {
   let res = await apihelper.get('public/v2/users',AUTH_HEADER);

   expect(res.status).toBe(200);
   expect(res.body.length).toBeGreaterThan(0);
   console.log(res);
})


//POST
test('POST - create a user', async({apihelper}) => {
    let data1 ={
    name:'juni',
    email:'junii4@gmail.com',
    gender:'male',
    status:'active'
};
    let res =await apihelper.post('public/v2/users',data1,AUTH_HEADER);
   // console.log(res);
    userid=res.body.id;
    console.log(userid);
   // expect(res.status).toBe(201);
   
});

//PUT
test('PUT - modify the name', async({apihelper}) => {
     let data1 ={
    name:'junoo',
};
   let res = await apihelper.put(`public/v2/users/${userid}`,data1,AUTH_HEADER);
   console.log(res);
})

test('Delete - delete the user',async({apihelper}) =>{
    await apihelper.delet(`public/v2/users/${userid}`,AUTH_HEADER);
})
});