import connection from "./db.js";
import knex from "knex";
const Knex = knex(connection)

Knex.schema.createTableIfNotExists("menu",(table)=>{
    table.increments("id")
    table.string("nombre")
    table.integer("precio")
    table.string("url")
})

.then(()=>console.log("Tabla creada!"))
.catch((e)=>{
   console.log(e)
})
.finally(()=>{
    Knex.destroy()
})