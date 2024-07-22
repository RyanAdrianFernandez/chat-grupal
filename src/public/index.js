console.log("Hola soy el cliente")

const titulo = document.querySelector("#welcome-text")
const send = document.querySelector("#send")
const btnEnviar = document.querySelector("#submit")
const socket = io()

let user = ""
Swal.fire({
    title: "Ingrese el usuario",
    input: "text",
    text: "Para iniciar chat identificarse",
    allowOutsideClick: false,
    inputValidator: (value)=>{
        return !value && "Error debe ingresar un valor"
    }
}).then((result)=>{
    console.log(result.value)
    user = result.value; 
    titulo.innerText = "Bienvenido " + user;
})

send.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        socket.emit("mensaje", {user, mensaje: event.target.value})
        event.target.value = ""

    }
})

btnEnviar.addEventListener("click", ()=>{
    socket.emit("mensaje", {user, mensaje: send.value})
    send.value = ""
})

socket.on("conversacion", (data)=>{
    const containerChat = document.querySelector("#contenedor-chat");
    containerChat.innerHTML = "";
    
    data.forEach(chat =>{
        const div = document.createElement("div");
        const nombre = document.createElement("p");
        const mensaje = document.createElement("p");

        nombre.innerText = chat.user + ": ";
        mensaje.innerText = chat.mensaje;
        nombre.classList.add("username")
        div.appendChild(nombre);
        div.appendChild(mensaje);
        div.classList.add("chat")
        containerChat.appendChild(div)
    })
})