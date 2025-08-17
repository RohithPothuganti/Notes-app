import Note from '../model/Note.js';

export const fetchAllNotes = async (req, res) => {
  try {
    const noteList = await Note.find({ user: req.user.id }).sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json(noteList);
  } catch (e) {
    res.status(500).json({ message: "Error fetching notes: " + e });
  }
};

export const fetchNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (e) {
    res.status(500).json({ message: "Error fetching note: " + e });
  }
};

export const addNewNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content, user: req.user.id });
  try {
    const response = await newNote.save();
    res.status(201).json({ message: 'Note added successfully', addedNote: response });
  } catch (e) {
    res.status(500).json({ message: "Error creating note: " + e });
  }
};

export const editNote = async (req, res) => {
  const { title, content, isPinned } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content, isPinned }, { new: true });
    res.status(200).json({ message: 'Note updated successfully', updatedNote });
  } catch (e) {
    res.status(500).json({ message: "Error updating note: " + e });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: "Error deleting note: " + e });
  }
};