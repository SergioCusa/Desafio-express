const express = require ("express")
const app = express()
const productosRouter = require ("./productosRouter")
const handlebars = require ("express-handlebars")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")

const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)


//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/productos",productosRouter)
app.use(express.static("views"))



//*Motor hbs

app.engine(
    "hbs",
    handlebars.engine({
     extname:"hbs",
     layoutsDir: __dirname + "/views",
     defaultLayout:("index")
     
}));

app.set("views", __dirname + "/views")
app.set("view engine","hbs")



app.get("/",(req,res)=>{
    res.render("form")
})

//*Coneccion Socket

const Mensajes = []

io.on("connection", (socket) =>{
    console.log(`conectado:  ${socket.id}`)
    socket.emit("mensajes",Mensajes)
    socket.on("new_msg", (data) =>{
        console.log(data)
        Mensajes.push(data)
    io.sockets.emit("mensajes",Mensajes)    
    } )
} )




// const server = app.listen(8080,()=>{
//     console.log("Servidor iniciado")
// })

httpServer.listen(8080,()=>{
    console.log("iniciado socket")
})