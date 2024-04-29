import express from "express";
import {
    CreateDaneia,
    getDaneia,
    getDaneiaById,
    updateDaneia,
    DeleteDaneia
} from "../controllers/Daneia.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/daneia',verifyUser,adminOnly, getDaneia);
router.get('/daneia/:id',verifyUser,adminOnly,getDaneiaById);
router.post('/daneia',verifyUser,adminOnly,CreateDaneia);
router.patch('/daneia/:id',verifyUser,adminOnly,updateDaneia);
router.delete('/daneia/:id',verifyUser,adminOnly,DeleteDaneia);


export default router;