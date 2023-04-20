import { Router } from "express";
import { uploadFiles } from '../controllers/file.controller.js';


const router = Router();


router.post('/upload', uploadFiles);

export default router;