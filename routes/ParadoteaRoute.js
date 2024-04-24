import express from "express";
import {
    getParadotea,
    getParadoteaById,
    createParadotea,
    updateParadotea,
    deleteParadotea
} from "../controllers/Paradotea.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/paradotea',verifyUser,adminOnly, getParadotea);
router.get('/paradotea/:id',verifyUser,adminOnly,getParadoteaById);
router.post('/paradotea',verifyUser,adminOnly,createParadotea);
router.patch('/paradotea/:id',verifyUser,adminOnly,updateParadotea);
router.delete('/paradotea/:id',verifyUser,adminOnly,deleteParadotea);


export default router;