import express from "express";
import {
    getEkxorimena_Timologia,
    getEkxorimena_TimologiaById,
    CreateEkxorimena_Timologia,
    updateEkxorimena_Timologia,
    DeleteEkxorimena_Timologia
} from "../controllers/Ekxorimena_Timologia.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/ek_tim',verifyUser,adminOnly, getEkxorimena_Timologia);
router.get('/ek_tim/:id',verifyUser,adminOnly,getEkxorimena_TimologiaById);
router.post('/ek_tim',verifyUser,adminOnly,CreateEkxorimena_Timologia);
router.patch('/ek_tim/:id',verifyUser,adminOnly,updateEkxorimena_Timologia);
router.delete('/ek_tim/:id',verifyUser,adminOnly,DeleteEkxorimena_Timologia);


export default router;