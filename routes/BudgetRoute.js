import express from "express";
import {
    getBudget,
    getBudgetById,
    createBudget,
    updateBudget,
    deleteBudget
} from "../controllers/Budget.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/budget',verifyUser,adminOnly, getBudget);
router.get('/budget/:id',verifyUser,adminOnly,getBudgetById);
router.post('/budget',verifyUser,adminOnly,createBudget);
router.patch('/budget/:id',verifyUser,adminOnly,updateBudget);
router.delete('/budget/:id',verifyUser,adminOnly,deleteBudget);


export default router;