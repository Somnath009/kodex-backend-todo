import express from 'express';
import noteModel from './models/note.model.js';

const app = express();

app.use(express.json());



export default app;