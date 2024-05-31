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
import income from "../models/incomesModel.js";

import {
    createIncome,
    updateIncome,
    deleteIncome
    
} from "../controllers/Income.js";
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
                erga_id:req.params.id,
                timologia_id: null
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}


export const getErgaforParadotea = async (req, res) => {

    try {
        const response = await Erga.findAll({
            attributes: ['title'],
            include: [{
                model: Erga,
                attributes: ['name', 'id'],
                required: true // Ensures INNER JOIN
            }],
            group: ['erga.name'] // Group by the attributes you select
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    

}

export const UpdateTimologia_idFromParadotea = async (req, res) => {
    // const paradotea = await Paradotea.findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // });

    // if (!paradotea) return res.status(404).json({ msg: "paradotea not found" });

    // try {
    //     const { timologia_id } = req.body;

    //     const updatedParadotea = await Paradotea.update(
    //         {
    //             timologia_id: timologia_id
    //         },
    //         {
    //             where: {
    //                 id: paradotea.id
    //             }
    //         }
    //     );
    //     //updateIncome(paradotea.id,timologia_id,null,res)

    //     res.status(200).json({ msg: "Paradotea updated successfully" });

    // } catch (error) {
    //     res.status(400).json({ msg: error.message });
    // }

  const { id } = req.params;
  const { timologia_id } = req.body;

  try {
    const paradotea = await Paradotea.findByPk(id);

    if (!paradotea) {
      return res.status(404).json({ msg: 'Paradotea not found' });
    }

    paradotea.timologia_id = timologia_id;
    await paradotea.save();

    //res.status(200).json({ msg: 'Timologia ID updated successfully' });
    updateIncome(id,timologia_id,null,res)
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export const CheckParadotea = async (req, res) => {
    try {
        const response = await incomes.findAll({
            attributes: ['paradotea_id'],
            include: [{
                model: Paradotea,
                required: true, // Ensures INNER JOIN
                include: [{
                    model: Erga, // Include the Erga model inside Paradotea
                    attributes: ['name', 'id', 'color'],
                    required: true // Ensures INNER JOIN
                }]
            }],
            where: {
                ekxorimena_timologia_id: null
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const ParadoteaBank_Date = async (req, res) => {
    try {
        const response = await incomes.findAll({
            attributes: ['ekxorimena_timologia_id'],
            include: [{
                model: Ekxorimena_Timologia,
                required: true, // Ensures INNER JOIN
                where: {
                         bank_date: { [Op.not]: null } 
                }
            },
        {
            model: Paradotea, // Include the Paradotea model inside Timologia
            include: [{
                model: Erga, // Include the Erga model inside Paradotea
                attributes: ['id', 'name', 'color'] // Specify the attributes from Erga
            }]
        }],
            
            where: {
                ekxorimena_timologia_id: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const ParadoteaCust_Date = async (req, res) => {
    try {
        const response = await incomes.findAll({
            attributes: ['ekxorimena_timologia_id'],
            include: [{
                model: Ekxorimena_Timologia,
                required: true, // Ensures INNER JOIN
                where: {
                         cust_date: { [Op.not]: null } 
                }
            },
        {
            model: Paradotea, // Include the Paradotea model inside Timologia
            include: [{
                model: Erga, // Include the Erga model inside Paradotea
                attributes: ['id', 'name', 'color'] // Specify the attributes from Erga
            }]
        }],
            
            where: {
                ekxorimena_timologia_id: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getTim_From_Income = async(req,res) =>
{
    try {
        // Step 1: Find unique timologia_id from the incomes table
        const uniqueTimologiaIds = await incomes.findAll({
            attributes: ['timologia_id'],
            where: {
                timologia_id: { [Op.not]: null },
                ekxorimena_timologia_id: null
            },
            group: ['timologia_id']
        });

        // Extract the unique timologia_id values
        const timologiaIds = uniqueTimologiaIds.map(item => item.timologia_id);

        if (timologiaIds.length === 0) {
            return res.status(200).json([]); // No records found
        }

        // Step 2: Fetch Timologia records using the unique timologia_id values
        const timologiaRecords = await timologia.findAll({
            where: {
                id: timologiaIds
            },
            attributes: ['invoice_number', 'id']
        });

        res.status(200).json(timologiaRecords);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getParadoteoAndErgoByTimologio = async (req,res) =>
    {
        const { timologia_id } = req.params;
    try {
        const ParadoteoAndErgo = await Paradotea.findAll({
            // attributes: [],
            where: {
                [Op.or]: [
                    { timologia_id: timologia_id },
                    { timologia_id: null }
                ]
            },
            include: [
                {
                    model: Erga,
                    attributes: ['id', 'name']
                }
            ]
        });

        res.json(ParadoteoAndErgo); // Assuming you want to send the data back as JSON
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    }







