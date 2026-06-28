
import fs from 'fs';

export class jsonHelper{

    static readJson(filePath:string):Record<string,string>[]{
        return JSON.parse(fs.readFileSync(filePath,"utf-8"));
    }
}