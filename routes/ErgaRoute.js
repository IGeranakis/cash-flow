import express from "express";
import {
    getErga,
    getErgaById,
    createErga,
    updateErga,
    deleteErga,
} from "../controllers/Erga.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
import { upload } from "../middleware/multer-config.js";  // Import multer config

const router = express.Router();

router.get('/erga',verifyUser,adminOnly, getErga);
router.get('/erga/:id',verifyUser,adminOnly,getErgaById);

//logo image uploade
router.post('/erga',upload.single('logoImage'),verifyUser,adminOnly,createErga);
router.patch('/erga/:id',verifyUser,adminOnly,upload.single('logoImage'),updateErga);
router.delete('/erga/:id',verifyUser,adminOnly,deleteErga);


export default router;
