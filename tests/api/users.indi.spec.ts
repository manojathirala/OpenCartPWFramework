import { apiHelper } from '../../src/api/apiHelper';
import {test,expect} from '../../src/fixtures/apiFix';

const TOKEN = process.env.API_Token;
const AUTH_HEADER = {Authorization:`Bearer ${TOKEN}`};

async function create(apihelper: any) {
    let data ={
        name:'brune',
        email:`brune${Date.now()}@mail.com`,
        gender:'male',
        status:'active'
    }

    let response = await apihelper.post('public/v2/users',data,AUTH_HEADER);
    return response.body;
    
};

//post-->userid-->get-->verify
test('post and get using id',async({apihelper}) => {
    let response = await create(apihelper);

    let res = await apihelper.get(`public/v2/users/${response.id}`,AUTH_HEADER);
    expect( res.status).toBe(200);
   // console.log(res);
});

//post-->userid-->update-->get-->verify
test('post-update-get all process',async({apihelper}) => {
    let dat = {
        name:'kumar',
        status:'inactive'
    }
    let res = await create(apihelper);

    //put
    let ress = await apihelper.put(`public/v2/users/${res.id}`,dat,AUTH_HEADER);
    expect(ress.status).toBe(200);

    //get
    let response = await apihelper.get(`public/v2/users/${res.id}`,AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(dat.name);
   // console.log(response);
})

//post-->userid-->update-->get-->delete
test('delete from star to end',async({apihelper}) => {
    let dat = {
        name:'kumar',
        status:'inactive'
    }
    let res = await create(apihelper);

    let ress = await apihelper.put(`public/v2/users/${res.id}`,dat,AUTH_HEADER);
    expect(ress.status).toBe(200);

    let response = await apihelper.get(`public/v2/users/${res.id}`,AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(dat.name);
   
    let del = await apihelper.delet(`public/v2/users/${res.id}`,AUTH_HEADER);
    expect(del.status).toBe(204);

     let respons = await apihelper.get(`public/v2/users/${res.id}`,AUTH_HEADER);
    expect(respons.status).toBe(404);
    expect(respons.body.message).toBe('Resource not found');
})
