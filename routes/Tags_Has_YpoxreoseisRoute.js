import express from "express";
import {
    getTags_Has_Ypoxreoseis,
    getTags_Has_YpoxreoseisById,
    create_Tags_Has_Ypoxreoseis,
    update_Tags_Has_Ypoxreoseis,
    delete_Tags_Has_Ypoxreoseis

} from "../controllers/tags_has_ypoxreoseis.js"

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/thy',verifyUser,adminOnly, getTags_Has_Ypoxreoseis);
router.get('/thy/:id',verifyUser,adminOnly,getTags_Has_YpoxreoseisById);
router.post('/thy',verifyUser,adminOnly,create_Tags_Has_Ypoxreoseis);
router.patch('/thy/:id',verifyUser,adminOnly,update_Tags_Has_Ypoxreoseis);
router.delete('/thy/:id',verifyUser,adminOnly,delete_Tags_Has_Ypoxreoseis);


export default router;