import express from "express";
import {
    getCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../controllers/Customer.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
import { upload } from "../middleware/multer-config.js";  // Import multer config

const router = express.Router();

router.get('/customer',verifyUser,adminOnly, getCustomer);
router.get('/customer/:id',verifyUser,adminOnly,getCustomerById);
router.post('/customer',upload.single('logoImage'),verifyUser,adminOnly,createCustomer);
router.patch('/customer/:id',verifyUser,adminOnly,upload.single('logoImage'),updateCustomer);
router.delete('/customer/:id',verifyUser,adminOnly,deleteCustomer);


export default router;