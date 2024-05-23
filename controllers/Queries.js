import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import {Op, Sequelize } from "sequelize";
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

export const getSumofChoosenTimologioById = async (req, res) => {
    const timologiaId = req.params.id;
    try {
        const response = await Paradotea.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('paradotea.ammount_total')), 'totalek']
            ],
            
            where: {
                timologia_id: timologiaId
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "Timologia not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


//Get a unique name list of Erga  that have paradotea
export const getErgaforTimologia = async (req, res) => {
    try {
        const response = await Paradotea.findAll({
            attributes: ['title'],
            include: [{
                model: Erga,
                attributes: ['name', 'id'],
                required: true // Ensures INNER JOIN
            }],
            where: {
                timologia_id: null
            },
            group: ['erga.name'] // Group by the attributes you select
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const getParadoteaByErgoId = async(req,res)=>{
    try{
        const response = await Paradotea.findAll({
            attributes:['id','part_number','title','delivery_date','percentage','erga_id','timologia_id','ammount','ammount_vat','ammount_total','estimate_payment_date','estimate_payment_date_2','estimate_payment_date_3'],
            where:{
                erga_id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}


