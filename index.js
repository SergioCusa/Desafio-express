const express = require ("express")

// importando e instanciando clase
const contenedor = require("./class")
const cont = new contenedor("./productos.json") 



const app = express()
// Declaracion de rutas

app.get("/",(req,res)=>{
    res.send(`<h1 style="color: red" >Bienvenidos al servidor express</h1>`)
})

app.get("/productos",(req,res)=>{
    
    res.send(cont.getAll())
})

app.get("/productoRandom",(req,res)=>{
    
    res.send(cont.getRandom())
})





const server = app.listen(8080,()=>{
    console.log("Servidor iniciado")
})