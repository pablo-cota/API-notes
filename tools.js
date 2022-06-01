const { redirect } = require("express/lib/response");
const fs = require("fs"); //importamos fs para escribir y leer archivos
const { request } = require("http");
const { title } = require("process");

const addNote = function (title, body) {
  //creacion de addNote para formar la estructura del archivo
  console.log("El título de la nota", title);
  console.log("El cuerpo de la nota", body);
  const notes = loadNotes();
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)):0
  const duplicateNote = notes.find((note) => note.title === title); //si la nota está duplicada se muestra una bandera
  if (!duplicateNote) {
    id = maxId+1
    notes.push(
      {
        id: id,
        title: title,
        body: body
      }
    );
    saveNotes(notes); //validación si existe o no una nota con el mismo titulo
    console.log("Notas creadas"); 
    return true
  } else {
    console.log("Error al crear la nota");
    return false
  }
};

//Guardar notas
const saveNotes = function(notes){
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
}

//Cargar notas
const loadNotes = function(){
  try {
      const dataBuffer = fs.readFileSync("notes.json")
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
  } catch (e) {
      return []
  }
}

//Listar notas
const listNotes = function(){
  const notes = loadNotes()
  notes.forEach((note)=>{
      console.log("El título de la nota: ", note.title)
      console.log("El cuerpo de la nota: ", note.body) 
      return JSON.parse(dataJSON) 
  });
}

//Quitar notas
const removeNote = function(id){
  const notes = loadNotes(id)
  const notesToKeep = notes.filter((note)=>note.id != id)
  if (notes.length >notesToKeep.length){
      console.log("Note removed!!")
      saveNotes(notesToKeep)
      return true
  } else{
      console.log("Note not found!!")
      return false
  }
}

//Leer nota
const readOneNote = function (id) {
  console.log(id);
  const notes = loadNotes();
  const note = notes.find((note) => note.id === id);

  console.log(note);
  if (note) {
    console.log("Nota encontrada");
    console.log(note.id, note.title, note.body);
    return note
  } else {
    console.log("Nota no encontrada");
    return false
  }
};


//Modificar nota, ejmeplo de la Dra
const modifyNote = function(id, ntitle, nbody){
  const nota = readOneNote(id)
  const aux_id = nota.id
  removeNote(id)
  const notes = loadNotes()
  const duplicateNote = notes.find((note)=> note.id === aux_id)
  if(!duplicateNote){
    notes.push(
      {
        id: aux_id,
        title: ntitle,
        body: nbody
      }
    )
    saveNotes(notes)
    console.log("Nota modificada")
    return true
  } else{
    console.log("Error al modificar")
    return false
  }
}

module.exports = {
  readOneNote: readOneNote,
  addNote: addNote,
  loadNotes: loadNotes,
  saveNotes: saveNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  modifyNote: modifyNote
};
