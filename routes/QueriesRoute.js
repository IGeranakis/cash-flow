import express from "express";
import {
    getUniqueNameErgaOfPar,
    getParErgColor
} from "../controllers/Queries.js"

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/getlistErgaNames',verifyUser,adminOnly, getUniqueNameErgaOfPar);
router.get('/getlistParErgColors',verifyUser,adminOnly, getParErgColor);
// router.get('/timologia/:id',verifyUser,adminOnly,getTimologioById);
// router.post('/timologia',verifyUser,adminOnly,CreateTimologia);
// router.patch('/timologia/:id',verifyUser,adminOnly,UpdateTimologia);
// router.delete('/timologia/:id',verifyUser,adminOnly,DeleteTimologio);


export default router;