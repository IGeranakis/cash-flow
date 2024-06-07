import express from "express";
import {
    getYpoxreoseis,
    createYpoxreoseis,
    updateYpoxreoseis,
    deleteYpoxreoseis,
    getYpoxreoseisById
} from "../controllers/Ypoxreoseis.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/ypo',verifyUser,adminOnly, getYpoxreoseis);
router.get('/ypo/:id',verifyUser,adminOnly,getYpoxreoseisById);
router.post('/ypo',verifyUser,adminOnly,createYpoxreoseis);
router.patch('/ypo/:id',verifyUser,adminOnly,updateYpoxreoseis);
router.delete('/ypo/:id',verifyUser,adminOnly,deleteYpoxreoseis);


export default router;