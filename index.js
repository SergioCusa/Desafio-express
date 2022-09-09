const express = require ("express")

//*importando e instanciando clase
const contenedor = require("./class")
const cont = new contenedor("./productos.json") 

const app = express()

//*Middlewares
app.use(express.urlencoded())
app.use(express.json())


//*Declaracion de rutas

app.get("/",(req,res)=>{
    res.send(`<h1 style="color: red" >Bienvenidos al servidor express</h1>`)
   
})

app.get("/productos", async (req,res)=>{
   
    const data = await cont.getAll()
    console.log(data)
    res.send(data)
})

app.get("/producto",async (req,res)=>{
    const {id} = req.query
    try {
        const data = await cont.getById(id)
        res.send(data)
    }catch(e){
        res.status(404).send({error:true, msj: e.message})
    }    

        
})

app.get("/productoRandom",(req,res)=>{
    
    res.send(cont.getRandom())
})

app.post("/producto", async (req,res)=>{
    const {nombre,material}= req.body
    const data = await cont.save({nombre,material})
    res.send({error:false,msg:"Usuario creado"})
    
})



const server = app.listen(8080,()=>{
    console.log("Servidor iniciado")
})