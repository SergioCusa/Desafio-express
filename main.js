const express = require ("express")
const app = express()
const productosRouter = require ("./productosRouter")
const handlebars = require ("express-handlebars")



//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/productos",productosRouter)
// app.use("/",express.static( __dirname + "/public"))

app.engine(
    "hbs",
    handlebars.engine({
     extname:"hbs",
     layoutsDir: __dirname + "/views/layouts",
     
}));

app.set("views","/views")
app.set("view engine","hbs")



app.get("/productos",(req,res)=>{
    res.render("form")
})



const server = app.listen(8080,()=>{
    console.log("Servidor iniciado")
})