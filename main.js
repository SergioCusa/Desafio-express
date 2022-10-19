import express from "express"
const app = express()
import router from "./productosRouter.js"
import handlebars from "express-handlebars"
import { Server } from "http"
import { Server as ServerIo }   from "socket.io"
import path from "path"
import { fileURLToPath } from "url"
const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)


const httpServer = new Server(app)
const io = new ServerIo(httpServer)


//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/productos",router)
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