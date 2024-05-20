import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";
import Paradotea from "../models/ParadoteaModel.js";
import Ekxorimena_Timologia from "../models/Ekxorimena_TimologiaModel.js";
import timologia from "../models/TimologiaModel.js";
import Daneia from "../models/DaneiaModel.js";
import incomes from "../models/incomesModel.js";

//Get a unique name list of Erga  that have paradotea
export const getUniqueNameErgaOfPar = async (req, res) => {
    try {
        const response = await Paradotea.findAll({
            attributes: ['title'],
            include: [{
                model: Erga,
                attributes: ['name','color'],
                // required: true // This acts as the INNER JOIN condition
            }],
            group: ['erga.name']
        });
        // res.status(200).json(response.map(entry => entry.erga.name));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
//Get paradotea colors and name
export const getParErgColor = async (req, res) => {
    try {
        const response = await Paradotea.findAll({
            include: [{
                model: Erga,
                attributes: ['name','color'],
                // required: true // This acts as the INNER JOIN condition
            }],
            
        });
        // res.status(200).json(response.map(entry => entry.erga.name));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// export const getDaneiaById = async(req,res)=>{
//     try{
//         const response = await Daneia.findOne({
//             attributes:['id','name','ammount','status'],
//             where:{
//                 id:req.params.id
//             }
//         });
//         res.status(200).json(response);

//     } catch (error){
//         res.status(500).json({ msg:error.message });
//     }
    
// }



