import express from 'express';
import { processData, createMoneybirdContact } from "../controllers/dataController";
import multer from 'multer';

// Set up multer for handling form-data
const upload = multer();

const router = express.Router();

router.post("/data", upload.none(), processData);

router.post("/create-contact", upload.none(), createMoneybirdContact);

export default router;
