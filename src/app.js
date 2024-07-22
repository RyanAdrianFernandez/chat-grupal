import express from "express"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import viewsRouter from "./routes/viewsRouter.router.js"
import { Server } from "socket.io"

const app = express()
const PORT = 8080 || 3000 // Esto deberia ser un valor desde la variable de entorno 

// Para usar Handlebars instanciamos 
app.engine("handlebars", handlebars.engine())
// Seteamos para poder usarlo
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars" )
app.use(express.static(__dirname + "/public"))
app.use("/", viewsRouter)

const httpServer = app.listen(PORT, ()=>{
    console.log("Server Listo")
})

const io = new Server(httpServer)
const conversacion = [];

io.on("connection", (socket)=>{
    console.log("Nueva conexion")

    socket.on("mensaje", (data)=>{
        console.log(data)
        conversacion.push(data)
        io.emit("conversacion", conversacion)
    })
})