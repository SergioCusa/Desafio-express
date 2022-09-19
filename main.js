const express = require ("express")
const app = express()
const productosRouter = require ("./productosRouter")
const handlebars = require ("express-handlebars")



//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/productos",productosRouter)



//*Motor hbs

app.engine(
    "hbs",
    handlebars.engine({
     extname:"hbs",
     layoutsDir: __dirname + "/hbs",
     defaultLayout:("index")
     
}));

app.set("views", __dirname + "/hbs")
app.set("view engine","hbs")



app.get("/",(req,res)=>{
    res.render("form")
})


//-------------------------------------------

//*motor ejs

// app.set("views", __dirname + "/ejs")
// app.set("view engine","ejs")

// app.get("/",(req,res)=>{
//     res.render("form")
// })





const server = app.listen(8080,()=>{
    console.log("Servidor iniciado")
})