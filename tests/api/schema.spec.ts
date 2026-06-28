

import { errors } from '@playwright/test';
import{test,expect} from '../../src/fixtures/apiFix';
import Ajv from 'ajv';
import { excelHelper } from '../../src/utlis/excelHelper';

let token = process.env.API_Token;
let headers = {Authorization:`Bearer ${token}`};

let ajv= new Ajv();

let schema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

let fullSchema ={
    "type": "array",
    "items": schema
};

test('get the json object',async({apihelper}) => {
    let data1 = {
        name:'manuk',
        email:`mauk${Date.now()}@gmail.com`,
        gender:'male',
        status:'active'
    }
   let res = await apihelper.post('public/v2/users',data1,headers);
    let userid = res.body.id;
    console.log(userid);

    let response =await apihelper.get(`public/v2/users/${userid}`,headers);
    let json = response.body;

    console.log(json);

    let validate = ajv.compile(schema);
    let isSchermavalid = validate(json);

    if(!isSchermavalid){
        console.log('schema got errors',validate.errors);
    }
    expect(isSchermavalid).toBeTruthy();
});

test('GET - get the full schema',async ({apihelper}) => {
   let res = await apihelper.get('public/v2/users',headers);
   let json = res.body;

   let validate = ajv.compile(fullSchema);
   let schemas = validate(json);

   if(!schemas){
    console.log('schema as erros',validate.errors);
   }

   expect(schemas).toBeTruthy();
})