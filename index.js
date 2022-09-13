const express = require ("express")
const app = express()

//*importando e instanciando clase
const contenedor = require("./class")
const cont = new contenedor("./productos.json") 


//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//*Declaracion de rutas

app.get("/",(req,res)=>{
    res.send(`<h1 style="color: red" >Bienvenidos al servidor express</h1>`)
   
})

app.get("/api/productos", async (req,res)=>{
   
    const data = await cont.getAll()
    console.log(data)
    res.send(data)
})

app.get("/api/productos/:id",async (req,res)=>{
    const {id} = req.params
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

app.post("/api/productos", async (req,res)=>{
    const {title,price,thimbnail}= req.body
    await cont.save({title,price,thimbnail})
    res.send({error:false,msg:"Producto cargado"})
    
})


app.put("/api/productos/:id", (req, res) => {
    try {
      const { id } = req.params;
      const prodNuevo = req.body;
      const idInt = parseInt(id);
      res.send(cont.updateById(idInt, prodNuevo));
    } catch (err) {
      res.status(404).send(err.msg);
    }
  })

  app.delete("/api/productos/:id",(req,res)=>{
    try {
        const { id } = req.params;
        res.send(cont.deleteById(parseInt(id)));
      } catch (err) {
        res.status(404).send(err.msg);
      }
  })
   








const server = app.listen(8080,()=>{
    console.log("Servidor iniciado")
})