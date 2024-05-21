import express from "express";
import {
    getErga,
    getErgaById,
    createErga,
    updateErga,
    deleteErga,
} from "../controllers/Erga.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/erga',verifyUser,adminOnly, getErga);
router.get('/erga/:id',verifyUser,adminOnly,getErgaById);
router.post('/erga',verifyUser,adminOnly,createErga);
router.patch('/erga/:id',verifyUser,adminOnly,updateErga);
router.delete('/erga/:id',verifyUser,adminOnly,deleteErga);


export default router;