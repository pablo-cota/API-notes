const { response } = require("express")
const { request } = require("express")
const express = require("express")
const res = require("express/lib/response")
const tools = require("./tools")


const app = express()
app.use(express.json()) //Permite acceder facilmente a los datos utilizando un json

//Punto de entrada para probar el servidor express
app.get("/",(request, response) =>{
    response.send("<h1>Hello backend</h1>")
})

//Solicitud de lista notas
app.get("/api/notes", (request, response)=> {
    const result = tools.loadNotes()
    console.log("Resultado", result)
    if (result.length>0){
        response.json(result)
    }else{
        response.status(404).end()
    }
    console.log(result)
})

app.post("/api/notes", (request, response)=>{
    const note = request.body
    console.log(note)
    const result = tools.addNote(note.title, note.body)
    if (result){
        response.status(200).end()
     } else{
         response.status(204).end()
     }
})

//Borrar nota
app.delete("/api/notes/:id", (request, response)=>{
    const id = Number(request.params.id)
    const result = tools.removeNote(id)
    if (result){
        response.status(200).end()
    }else{
        response.status(204).end()
    }
})

app.get("/api/notes/:id", (request, response) =>{
    const id = Number(request.params.id)
    console.log(id)
    const result = tools.readOneNote(id)
    if(result){
        response.json(result)
    }else{
        response.status(404).end()
    }
    console.log(result)
})

//Editar nota
app.put("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const ntitle = request.body.title
    const nbody = request.body.body
    const result = tools.modifyNote(id,ntitle,nbody)
    if(result){
        response.status(200).end()
    }else{
        response.status(204).end()
    }
})

/*
app.put("/api/notes/:id", (request, response) =>{
    const id = Number(request.params.id)
    const body = request.body.body
    const title = request.body.title
    const delet = tools.removeNote(id)
    if (delet){
        response.status(200)
    } else{
        response.status(404).end
    }
    const result = tools.modifyNote(id,title,body)
    if(result){
        response.json(result)
    }else{
        response.status(404).end()
    }
    /*console.log(id)
    const result = tools.readOneNote(id)
    if(result){
        response.json(result)
    }else{
        response.status(404).end()
    }
    console.log(result)
    const delet = tools.removeNote(id)
    if (delet){
        response.status(200)
    } else{
        response.status(404).end
    }
    const note = request.body
    console.log(note)
    const modi = tools.addNote(note.title, note.body)
    if (modi){
        response.status(200).end()
     } else{
         response.status(204).end()
     }
})*/

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})