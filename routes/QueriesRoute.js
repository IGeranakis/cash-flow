import express from "express";
import {
    getUniqueNameErgaOfPar,
    getParErgColor,
    getSumofChoosenTimologioById,
    getErgaforTimologia,
    getParadoteaByErgoId,
    getErgaforParadotea,
    UpdateTimologia_idFromParadotea,
    CheckParadotea,
    ParadoteaBank_Date,
    ParadoteaCust_Date,
    getTim_From_Income,
    getParadoteoAndErgoByTimologio,
    YpoxreoseisAndTagsQuery,
    findYpoxreoseisWithTags,
    findYpoxreoseisWithTagsId,
    updateYpoxreoseisWithTags,
    deleteYpoxreoseisWithTags,
    getTags_Has_YpoxreoseisByYpoxreoseisId,
    getIncomeTimogia,
    getIncomeParadotea,
    getGroupTableParadotea,
    getEkxForEsoda
} from "../controllers/Queries.js"

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/getlistErgaNames',verifyUser,adminOnly, getUniqueNameErgaOfPar);
router.get('/getlistParErgColors',verifyUser,adminOnly, getParErgColor);
router.get('/getSumofchosenTim/:id',verifyUser,adminOnly,getSumofChoosenTimologioById)
router.get('/getErgaforTimologia',verifyUser,adminOnly,getErgaforTimologia)
router.get('/getParadoteaByErgoId/:id',verifyUser,adminOnly,getParadoteaByErgoId)
router.get('/getErgaforParadotea/',verifyUser,adminOnly,getErgaforParadotea)
router.patch('/UpdateTimologia_idFromParadotea/:id', verifyUser,adminOnly,UpdateTimologia_idFromParadotea)
router.get('/CheckParadotea', verifyUser,adminOnly,CheckParadotea)
router.get('/ParadoteaBank_Date', verifyUser,adminOnly,ParadoteaBank_Date)
router.get('/ParadoteaCust_Date', verifyUser,adminOnly,ParadoteaCust_Date)
router.get('/getTim_From_Income', verifyUser,adminOnly, getTim_From_Income)

router.get('/getParadoteoAndErgoByTimologio/:timologia_id',verifyUser,adminOnly, getParadoteoAndErgoByTimologio)

router.get('/ypoquery',verifyUser,adminOnly,findYpoxreoseisWithTags)
router.get('/ypoquery/:id', verifyUser,adminOnly,findYpoxreoseisWithTagsId)

router.patch('/ypoquery/:id',verifyUser,adminOnly,updateYpoxreoseisWithTags)

router.delete('/ypoquery/:id',verifyUser,adminOnly,deleteYpoxreoseisWithTags)

router.post('/ypoquery', verifyUser,adminOnly,YpoxreoseisAndTagsQuery)

router.get('/ypotags/:ypoxreoseis_id', verifyUser,adminOnly, getTags_Has_YpoxreoseisByYpoxreoseisId )
router.get('/income_tim',verifyUser,adminOnly,getIncomeTimogia)
router.get('/income_par',verifyUser,adminOnly,getIncomeParadotea)
router.get('/getGroupTableParadotea',verifyUser,adminOnly,getGroupTableParadotea)
router.get('/getekxforesoda', verifyUser,adminOnly, getEkxForEsoda)
export default router;