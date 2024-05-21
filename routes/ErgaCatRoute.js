import express from "express";
import {
    getErgaCat,
    getErgaCatById,
    creategetErgaCat,
    updategetErgaCat,
    deletegetErgaCat
} from "../controllers/ErgaCategories.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/ergacat',verifyUser,adminOnly, getErgaCat);
router.get('/ergacat/:id',verifyUser,adminOnly,getErgaCatById);
router.post('/ergacat',verifyUser,adminOnly,creategetErgaCat);
router.patch('/ergacat/:id',verifyUser,adminOnly,updategetErgaCat);
router.delete('/ergacat/:id',verifyUser,adminOnly,deletegetErgaCat);


export default router;