import knex from "knex"


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
            console.log(e)
        
        }
    }

    async updateById(objeto,id){
        try{
            return await this.knex.from(this.table).where("id",id).update(objeto)
            
        }catch(e){
            console.log(e)
        }

    }

    async getById (id){
        try{
            return await this.knex.from(this.table).where({id})
        }catch(e){
            console.log(e)
        }
    }

    async deleteById (id){
        try{
            return await this.knex.from(this.table).where({id}).del()
        }catch(e){
            console.log(e)
        }
    }

    
}

export default dbContainer





























