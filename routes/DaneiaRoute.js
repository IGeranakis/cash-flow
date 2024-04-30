import express from "express";
import {
    createDaneia,
    getDaneia,
    getDaneiaById,
    updateDaneia,
    deleteDaneia
} from "../controllers/Daneio.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/daneia',verifyUser,adminOnly, getDaneia);
router.get('/daneia/:id',verifyUser,adminOnly,getDaneiaById);
router.post('/daneia',verifyUser,adminOnly,createDaneia);
router.patch('/daneia/:id',verifyUser,adminOnly,updateDaneia);
router.delete('/daneia/:id',verifyUser,adminOnly,deleteDaneia);


export default router;