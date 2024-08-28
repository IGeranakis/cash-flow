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
import Tags from "../models/TagsModel.js";
import Ypoxreoseis from "../models/YpoxreoseisModel.js"
import tags_has_ypoxreoseis from "../models/tags_has_ypoxreoseisModel.js";

import {
    createIncome,
    updateIncome,
    deleteIncome
    
} from "../controllers/Income.js";
import incomes from "../models/incomesModel.js";
// import { GREEK_GENERAL_CI } from "mysql/lib/protocol/constants/charsets.js";

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

export const YpoxreoseisAndTagsQuery = async(req,res)=>
{
    const { provider, erga_id, invoice_date, total_owed_ammount, ammount_vat, tags_id } = req.body;

    console.log('Received data:', req.body);

    try {
        // Insert into ypoxreoseis table
        const ypoxreoseis = await Ypoxreoseis.create({
            provider:provider,
            erga_id:erga_id,
            invoice_date:invoice_date,
            total_owed_ammount:total_owed_ammount,
            ammount_vat:ammount_vat
        });

        // console.log(provider)


        // Insert into tags_has_ypoxreoseis table
        const tagsToInsert = tags_id.map(tagId => ({
            tags_id: tagId,
            ypoxreoseis_id: ypoxreoseis.id,
        }));


        await tags_has_ypoxreoseis.bulkCreate(tagsToInsert);

        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert data', error: error.message });
    }
};



export const findYpoxreoseisWithTags = async (req, res) => {

    try {
        console.log("Fetching ypoxreoseis with tags...");

        // Fetch all distinct Ypoxreoseis records along with associated tags
        const ypoxreoseisWithTags = await tags_has_ypoxreoseis.findAll({
            include: [
                {
                    model: Ypoxreoseis,
                },
                {
                    model: Tags,
                    as: 'tag' // Alias for the Tags model to avoid confusion
                }
            ],
        });

        console.log("Ypoxreoseis with tags fetched successfully.");

        // Combine the data from ypoxreoseisWithTags
        const combinedData = {};
        ypoxreoseisWithTags.forEach(item => {
            const ypoxreoseisId = item.ypoxreosei.id;
            if (!combinedData[ypoxreoseisId]) {
                combinedData[ypoxreoseisId] = {
                    ypoxreoseis: {
                        id: item.ypoxreosei.id,
                        provider: item.ypoxreosei.provider,
                        invoice_date: item.ypoxreosei.invoice_date,
                        total_owed_ammount: item.ypoxreosei.total_owed_ammount,
                        ammount_vat: item.ypoxreosei.ammount_vat,
                        createdAt: item.ypoxreosei.createdAt,
                        updatedAt: item.ypoxreosei.updatedAt,
                        erga_id: item.ypoxreosei.erga_id
                    },
                    tags: [] // Initialize an empty array for tags
                };
            }
            combinedData[ypoxreoseisId].tags.push(item.tag.name);
        });

        const combinedArray = Object.values(combinedData);

        res.status(200).json(combinedArray); // Change status code to 200 for a successful fetch
    } catch (error) {
        console.error("Error fetching ypoxreoseis with tags:", error);
        res.status(500).json({ error: error.message });
    }
};

export const findYpoxreoseisWithTagsId = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter

        console.log(`Fetching ypoxreoseis with tags for ID ${id}...`);

        // Fetch all distinct Ypoxreoseis records along with associated tags
        const ypoxreoseisWithTags = await tags_has_ypoxreoseis.findAll({
            include: [
                {
                    model: Ypoxreoseis,
                },
                {
                    model: Tags,
                    as: 'tag' // Alias for the Tags model to avoid confusion
                }
            ],
        });

        console.log("Ypoxreoseis with tags fetched successfully.");

        // Combine the data from ypoxreoseisWithTags
        const combinedData = {};
        ypoxreoseisWithTags.forEach(item => {
            const ypoxreoseisId = item.ypoxreosei.id;
            if (!combinedData[ypoxreoseisId]) {
                combinedData[ypoxreoseisId] = {
                    ypoxreoseis: {
                        id: item.ypoxreosei.id,
                        provider: item.ypoxreosei.provider,
                        invoice_date: item.ypoxreosei.invoice_date,
                        total_owed_ammount: item.ypoxreosei.total_owed_ammount,
                        ammount_vat: item.ypoxreosei.ammount_vat,
                        createdAt: item.ypoxreosei.createdAt,
                        updatedAt: item.ypoxreosei.updatedAt,
                        erga_id: item.ypoxreosei.erga_id
                    },
                    tags: [] // Initialize an empty array for tags
                };
            }
            combinedData[ypoxreoseisId].tags.push(item.tag.name);
        });

        const ypoxreoseisById = combinedData[id];

        if (!ypoxreoseisById) {
            return res.status(404).json({ message: "Ypoxreoseis not found" });
        }

        res.status(200).json(ypoxreoseisById); // Change status code to 200 for a successful fetch
    } catch (error) {
        console.error("Error fetching ypoxreoseis with tags:", error);
        res.status(500).json({ error: error.message });
    }
}


export const updateYpoxreoseisWithTags = async(req,res)=>
{
    
    const { id } = req.params; // Retrieve the id from route parameters
    const { provider, erga_id, invoice_date, total_owed_ammount, ammount_vat, tags_id } = req.body;

    try {
        // Check if the record with the specified id exists
        let ypoxreoseis = await Ypoxreoseis.findByPk(id);

        if (ypoxreoseis) {
            // Update the existing record
            ypoxreoseis.provider = provider;
            ypoxreoseis.erga_id = erga_id;
            ypoxreoseis.invoice_date = invoice_date;
            ypoxreoseis.total_owed_ammount = total_owed_ammount;
            ypoxreoseis.ammount_vat = ammount_vat;

            await ypoxreoseis.save();

            // Delete existing tags associated with the ypoxreoseis_id
            await tags_has_ypoxreoseis.destroy({
                where: {
                    ypoxreoseis_id: ypoxreoseis.id
                }
            });

            // Insert new tags
            const tagsToInsert = tags_id.map(tagId => ({
                tags_id: tagId,
                ypoxreoseis_id: ypoxreoseis.id,
            }));

            await tags_has_ypoxreoseis.bulkCreate(tagsToInsert);
        } else {
            // If the record doesn't exist, return an error
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update data', error: error.message });
    }
}



export const deleteYpoxreoseisWithTags = async(req,res)=>
{
    const { id } = req.params; // Retrieve the id from route parameters

    try {
        // Check if the record with the specified id exists
        let ypoxreoseis = await Ypoxreoseis.findByPk(id);

        if (ypoxreoseis) {
            // Delete associated records from tags_has_ypoxreoseis table where ypoxreoseis_id matches
            await tags_has_ypoxreoseis.destroy({
                where: {
                    ypoxreoseis_id: ypoxreoseis.id
                }
            });

            // Delete the record from Ypoxreoseis table
            await ypoxreoseis.destroy();

            res.status(200).json({ message: 'Data deleted successfully' });
        } else {
            // If the record doesn't exist, return an error
            return res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete data', error: error.message });
    }
}


export const getTags_Has_YpoxreoseisByYpoxreoseisId = async (req, res) => {
    const { ypoxreoseis_id } = req.params;

    // Basic validation
    if (!ypoxreoseis_id) {
        return res.status(400).json({ msg: "ypoxreoseis_id parameter is missing" });
    }

    try {
        const response = await tags_has_ypoxreoseis.findAll({
            attributes: ['tags_id'],
            where: {
                ypoxreoseis_id: ypoxreoseis_id
            }
        });

        if (response.length === 0) {
            return res.status(404).json({ msg: "No tags found for the given ypoxreoseis_id" });
        }

        // Extracting all tags_id from the response
        const tagsIds = response.map(item => item.tags_id);

        const response2 = await Tags.findAll({
            attributes: ['id','name'],
            where: {
                id: tagsIds
            }
        });

        res.status(200).json(response2);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};

export const getIncomeParadotea = async (req, res) => {

    try {
        const response = await income.findAll({
            where: {
                ekxorimena_timologia_id: { [Op.is]: null },
                timologia_id: { [Op.is]: null },
                paradotea_id:{[Op.not]:null}
            },
            include: [{
                model: Paradotea,
                
                required: true, // Ensures INNER JOIN
                
                
            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    

};

export const getIncomeTimogia = async (req, res) => {
    try {
        const response = await income.findAll({
            where: {
               
                ekxorimena_timologia_id: { [Op.is]: null },
                timologia_id: { [Op.not]: null }
            },
            include: [{
                model: timologia,
               as:"timologia",
                required: true, // Ensures INNER JOIN
                where:{
                    status_paid:"no"
                }
                
            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};










