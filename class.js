import knex from "knex"

import fs from "fs"


class dbContainer{
    constructor(config,tabla){
        this.knex = knex(config)
        this.table = tabla
    }

    async save (objeto){
        try{
            return await this.knex.insert(objeto).into(this.table)
        }catch(e){
            console.log(e)
        }
    }

    async getAll(){
        try{
            return await this.knex.select("*").from(this.table)
        }catch(e){
            throw new ERROR(e)
        }
    }

    
}

export default dbContainer





























