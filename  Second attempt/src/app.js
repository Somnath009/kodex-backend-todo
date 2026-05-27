import express from "express";
import noteModel from "./models/note.model.js";

const app = express();

app.use(express.json());

/** * @route POST /api/notes
 * * @description Create a new note need title and description in the request body
 * * @access Public
 */
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res
            .status(400)
            .json({ message: "Title and description are required" });
    }

    // Here you would typically save the note to a database

    if (title.trim().length < 3) {
        return res
            .status(400)
            .json({ message: "Title must be at least 3 characters long" });
    }

    if (description.trim().length < 10) {
        return res
            .status(400)
            .json({
                message: "Description must be at least 10 characters long",
            });
    }

    const newNote = await noteModel.create({
        title,
        description,
    });

    return res.status(201).json({
        message: "Note created successfully",
        newNote,
    });
});

/** * @route GET /api/notes
 * * @description Get all notes
 * * @access Public
 */
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();

    if (!notes) {
        return res.status(404).json({ message: "No notes found" });
    }

    return res.status(200).json({
        message: "Notes fetched successfully",
        notes,
    });
});

/**
 * @route PATCH /api/notes/:id
 * * @description Update a note by ID, require description in the request body
 * * @access Public
 */
app.patch("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: "Description is required" });
    }

    const note = await noteModel.findById(id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    note.description = description;
    await note.save();

    return res.status(200).json({
        message: "Note updated successfully",
        note,
    });
});

export default app;
