import express from "express";
import {
    getTags,
    createTags,
    updateTags,
    deleteTags,
    getTagsById
} from "../controllers/Tags.js"

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/tags',verifyUser,adminOnly, getTags);
router.get('/tags/:id',verifyUser,adminOnly,getTagsById);
router.post('/tags',verifyUser,adminOnly,createTags);
router.patch('/tags/:id',verifyUser,adminOnly,updateTags);
router.delete('/tags/:id',verifyUser,adminOnly,deleteTags);


export default router;