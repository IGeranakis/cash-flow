import express from "express";
import {
    getTimologia,
    CreateTimologia,
    UpdateTimologia,
    DeleteTimologio,
    getTimologioById
} from "../controllers/Timologia.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/timologia',verifyUser,adminOnly, getTimologia);
router.get('/timologia/:id',verifyUser,adminOnly,getTimologioById);
router.post('/timologia',verifyUser,adminOnly,CreateTimologia);
router.patch('/timologia/:id',verifyUser,adminOnly,UpdateTimologia);
router.delete('/timologia/:id',verifyUser,adminOnly,DeleteTimologio);


export default router;