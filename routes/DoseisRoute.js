import express from "express";
import {
    getDoseis,
    getDoseisById,
    createDoseis,
    updateDoseis,
    deleteDoseis,
    createMultiDoseis,
    getDoseisByYpoId

} from "../controllers/Doseis.js"

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/doseis',verifyUser,adminOnly, getDoseis);
router.get('/doseis/:id',verifyUser,adminOnly,getDoseisById);
router.get('/doseis_by_ypo/:id',verifyUser,adminOnly,getDoseisByYpoId);
router.post('/doseis',verifyUser,adminOnly,createDoseis);
router.post('/multidoseis',verifyUser,adminOnly,createMultiDoseis);
router.patch('/doseis/:id',verifyUser,adminOnly,updateDoseis);
router.delete('/doseis/:id',verifyUser,adminOnly,deleteDoseis);


export default router;