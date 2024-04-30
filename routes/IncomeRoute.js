import express from "express";
import {
    getIncome,
    getIncomeById
} from "../controllers/Income.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/income',verifyUser,adminOnly, getIncome);
router.get('/income/:id',verifyUser,adminOnly,getIncomeById);



export default router;