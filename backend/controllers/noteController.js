import Note from "../models/noteModel.js";

// ✅ Get all notes for the logged-in user
export const noteData = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json({
      data: notes,
      success: true,
      message: "Note data found successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Create a new note
export const createNote = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "Please enter all fields",
    });
  }

  try {
    const note = await Note.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      data: note,
      success: true,
      message: "Note created successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      success: false,
      message: "Something went wrong",
    });
  }
};

// ✅ Get a single note by ID
export const getNote = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "Invalid note ID",
    });
  }

  try {
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({
        data: null,
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      data: note,
      success: true,
      message: "Note fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Edit a note by ID
export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedNote || updatedNote.user.toString() !== req.user.id) {
      return res.status(404).json({
        data: null,
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      data: updatedNote,
      success: true,
      message: "Note updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Delete a note by ID
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote || deletedNote.user.toString() !== req.user.id) {
      return res.status(404).json({
        data: null,
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      data: deletedNote,
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal server error",
    });
  }
};
