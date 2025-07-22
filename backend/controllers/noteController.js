
import Note from "../models/noteModel.js";

// get data (get all notes)

export const noteData = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// creat new note

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.json({
      data: null,
      success: false,
      message: "please enter all fields",
    });
  }
  const newNote = new Note(req.body);
  const savedNote = await newNote.save();
  res
    .status(201)
    .json({
      data: savedNote,
      success: true,
      message: "note saved succesfully",
    });
};

// get item using id (single note)

 export const getNote = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      data: null,
      success: false,
      message: false,
    });
  }

 const note = await Note.findById(id);
  if (!note) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "note not found" });
  }

  res.status(201).json({ data: note });
};


// Edit note using its id

export const editNote = async(req,res)=>{
  const {id} = req.params;
  const {title,description}=req.body;
  if(!title || !description){
    return res.status(400).json({data:null, success:false , message:"please fill all fields"});
  }
  try{
    const updatedNote = await Note.findByIdAndUpdate(id,{title,description},{ new: true });
    return res.status(200).json({data:updatedNote,success:true,message:"note updated successfully"})
  }catch(err){
  return res.status(400).json({data:null,success:false,message:err.message});
  }
}

// delete note using its id

export const deleteNote = async(req,res)=>{
  const {id}= req.params;
  try{const deletedNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({data:deletedNote,success:true,message:"note deleted successfully"})
  }catch(err){
  return res.status(400).json({data:null,success:false,message:err.message});
  }

}