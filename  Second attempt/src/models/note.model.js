import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

const noteModel = mongoose.model("Note", noteSchema);

export default noteModel;