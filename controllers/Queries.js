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
import Doseis from "../models/DoseisModel.js";
import ErgaCategories from "../models/ErgaCategoriesModel.js";
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
                required: true // Ensures INNER JOIN
            },
        {
            model: Paradotea, // Include the Paradotea model inside Timologia
            include: [{
                model: Erga, // Include the Erga model inside Paradotea
                attributes: ['id', 'name', 'color'] // Specify the attributes from Erga
            }]
        },
        {
            model: timologia, // Include the Timologia model
            as: 'timologia',
            attributes: ['invoice_number'], // Specify the attributes from Timologia
            required: false // Optional INNER JOIN or LEFT JOIN based on your use case
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
                required: true // Ensures INNER JOIN
            },
        {
            model: Paradotea, // Include the Paradotea model inside Timologia
            include: [{
                model: Erga, // Include the Erga model inside Paradotea
                attributes: ['id', 'name', 'color'] // Specify the attributes from Erga
            }]
        },
        {
            model: timologia, // Include the Timologia model
            as: 'timologia',
            attributes: ['invoice_number'], // Specify the attributes from Timologia
            required: true // Optional INNER JOIN or LEFT JOIN based on your use case
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
            attributes: ['invoice_number','status_paid' ,'id']
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



// export const findYpoxreoseisWithTags = async (req, res) => {
//     try {
//         console.log("Fetching ypoxreoseis with tags and doseis...");

//         // Fetch all distinct Ypoxreoseis records along with associated tags and doseis count
//         const ypoxreoseisWithTagsAndDoseis = await tags_has_ypoxreoseis.findAll({
//             include: [
//                 {
//                     model: Ypoxreoseis,
//                     as: 'ypoxreosei', // Use the correct alias as defined in the associations
//                 },
//                 {
//                     model: Tags,
//                     as: 'tag' // Alias for the Tags model to avoid confusion
//                 }
//             ],
//             attributes: {
//                 include: [
//                     // Count the number of doseis connected to the ypoxreoseis
//                     [
//                         Sequelize.literal(`(
//                             SELECT COUNT(*)
//                             FROM doseis
//                             WHERE doseis.ypoxreoseis_id = ypoxreosei.id
//                         )`),
//                         'doseisCount'
//                     ]
//                 ]
//             },
//             group: [
//                 'tags_has_ypoxreoseis.id',
//                 'ypoxreosei.id', // Update to match the correct alias
//                 'tag.id'
//             ] // Group to avoid duplicate rows
//         });

//         console.log("Ypoxreoseis with tags and doseis fetched successfully.");

//         // Combine the data from ypoxreoseisWithTagsAndDoseis
//         const combinedData = {};
//         ypoxreoseisWithTagsAndDoseis.forEach(item => {
//             const ypoxreoseisId = item.ypoxreosei.id;
//             if (!combinedData[ypoxreoseisId]) {
//                 combinedData[ypoxreoseisId] = {
//                     ypoxreoseis: {
//                         id: item.ypoxreosei.id,
//                         provider: item.ypoxreosei.provider,
//                         invoice_date: item.ypoxreosei.invoice_date,
//                         total_owed_ammount: item.ypoxreosei.total_owed_ammount,
//                         ammount_vat: item.ypoxreosei.ammount_vat,
//                         createdAt: item.ypoxreosei.createdAt,
//                         updatedAt: item.ypoxreosei.updatedAt,
//                         erga_id: item.ypoxreosei.erga_id,
//                         doseisCount: item.dataValues.doseisCount // Add the count of doseis
//                     },
//                     tags: [] // Initialize an empty array for tags
//                 };
//             }
//             combinedData[ypoxreoseisId].tags.push(item.tag.name);
//         });

//         const combinedArray = Object.values(combinedData);

//         res.status(200).json(combinedArray); // Change status code to 200 for a successful fetch
//     } catch (error) {
//         console.error("Error fetching ypoxreoseis with tags and doseis:", error);
//         res.status(500).json({ error: error.message });
//     }
// };



export const findYpoxreoseisWithTags = async (req, res) => {


    try {
        // const now = new Date();
        // const currentYear = now.getFullYear();
        // const currentMonth = now.getMonth() + 1; // getMonth() is zero-based
    
        // // Create 'YYYY-MM-DD' for last day of current month
        // // const lastDayOfMonth = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];
        // const lastDayDate = new Date(currentYear, currentMonth, 0);
        // const lastDayOfMonth = lastDayDate.toISOString().split('T')[0];

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // No +1 here
        
        // This gets the last day of the current month
        const lastDayDate = new Date(currentYear, currentMonth + 1, 0); // next month, day 0 = last day of current
        const lastDayOfMonth = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDayDate.getDate()).padStart(2, '0')}`;

        console.log(lastDayOfMonth)

        console.log("Fetching ypoxreoseis with tags, doseis count, and paid doseis sum...");

        const ypoxreoseisWithTagsAndDoseis = await tags_has_ypoxreoseis.findAll({
            include: [
                {
                    model: Ypoxreoseis,
                    as: 'ypoxreosei',
                },
                {
                    model: Tags,
                    as: 'tag'
                }
            ],
            attributes: {
                include: [
                    // Count of all doseis
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM doseis
                            WHERE doseis.ypoxreoseis_id = ypoxreosei.id
                        )`),
                        'doseisCount'
                    ],
                    // Sum of amounts where status is 'yes'
                    [
                        Sequelize.literal(`(
                            SELECT COALESCE(SUM(doseis.ammount), 0)
                            FROM doseis
                            WHERE doseis.ypoxreoseis_id = ypoxreosei.id
                            AND doseis.status = 'yes'
                            AND doseis.actual_payment_date <= '${lastDayOfMonth}'
                        )`),
                        'Paid_doseis_ammount'
                    ],
                    // Sum of amounts where status is 'no'
                    [
                        Sequelize.literal(`(
                            SELECT COALESCE(SUM(doseis.ammount), 0)
                            FROM doseis
                            WHERE doseis.ypoxreoseis_id = ypoxreosei.id
                            AND doseis.status = 'no'
                            AND doseis.estimate_payment_date <= '${lastDayOfMonth}'
                        )`),
                        'NotPaid_doseis_ammount'
                    ]

                ]
            },
            group: [
                'tags_has_ypoxreoseis.id',
                'ypoxreosei.id',
                'tag.id'
            ]
        });

        console.log("Ypoxreoseis with tags, doseis count, and paid doseis sum fetched successfully.");

        const combinedData = {};
        ypoxreoseisWithTagsAndDoseis.forEach(item => {
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
                        erga_id: item.ypoxreosei.erga_id,
                        doseisCount: item.dataValues.doseisCount,
                        Paid_doseis_ammount: item.dataValues.Paid_doseis_ammount,
                        NotPaid_doseis_ammount:item.dataValues.NotPaid_doseis_ammount
                    },
                    tags: []
                };
            }
            combinedData[ypoxreoseisId].tags.push(item.tag.name);
        });

        const combinedArray = Object.values(combinedData);
        res.status(200).json(combinedArray);
    } catch (error) {
        console.error("Error fetching ypoxreoseis with tags and doseis:", error);
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
                required: true,
                include: [{
                    model: Erga,
                    required: true,
                    include: [{
                        model: Customer,
                        required: true,
                    }]

                // required: true,  Ensures INNER JOIN
                }]
            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    

};

export const getIncomeTimogia = async (req, res) => {
    try {
        const response = await incomes.findAll({
            attributes: ['timologia_id', 'ekxorimena_timologia_id'],
            include: [{
                model: timologia,
                as: 'timologia',
                required: true // Ensures INNER JOIN
            },
        {
            model: Paradotea, // Include the Paradotea model inside Timologia
            include: [{
                model: Erga, // Include the Erga model inside Paradotea
                attributes: ['id', 'name', 'color'], // Specify the attributes 
                include: [{
                    model: Customer,
                    attributes: ['id', 'name']
                }]
            }]
        }],
        where: {
        timologia_id: {
            [Op.not]: null // Check if timologia_id is not null
        },
        ekxorimena_timologia_id:
        {
            [Op.is]: null
        }
    }
        });
 
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// export const getGroupTableParadotea = async (req, res) => {
//     const query = `
// SELECT 
//     erga.name AS erga_name, 
//     customers.name AS customer_name,
//     customers.logoImage,
//     erga.status, 
//     erga.ammount_total, 
//     erga.sign_date,
//     SUM(CASE WHEN timologia.status_paid = 'yes' THEN (timologia.ammount_of_income_tax_incl + timologia.ammount_parakratisi_eight) ELSE 0 END) AS total_yes_timologia,
//     SUM(CASE WHEN timologia.status_paid = 'no' THEN (timologia.ammount_of_income_tax_incl + timologia.ammount_parakratisi_eight)  ELSE 0 END) AS total_no_timologia,
//     SUM(CASE WHEN paradotea.delivery_date < CURRENT_DATE AND paradotea.timologia_id IS NULL THEN paradotea.ammount_total ELSE 0 END) AS demands_no_tim,
//     -- New column: sum of total_no_timologia and apaitisis_no_tim
//     SUM(CASE WHEN timologia.status_paid = 'no' THEN (timologia.ammount_of_income_tax_incl + timologia.ammount_parakratisi_eight) ELSE 0 END) +
//     SUM(CASE WHEN paradotea.delivery_date < CURRENT_DATE AND paradotea.timologia_id IS NULL THEN paradotea.ammount_total ELSE 0 END) AS demands,
//     SUM(CASE WHEN paradotea.delivery_date > CURRENT_DATE AND paradotea.timologia_id IS NULL THEN paradotea.ammount_total ELSE 0 END) AS future_demands

// FROM 
//     erga
// LEFT JOIN 
//     paradotea ON paradotea.erga_id = erga.id
// LEFT JOIN 
//     customers ON customers.id = erga.customer_id
// LEFT JOIN 
//     timologia ON timologia.id = paradotea.timologia_id
// GROUP BY 
//     erga.id, 
//     customers.id
//     `;

//     try {
//         const results = await db.query(query, {
//             type: Sequelize.QueryTypes.SELECT // Specify the type of query
//         });

//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// };


export const getGroupTableParadotea = async (req, res) => {
    const query = `
    SELECT 
        erga.name AS erga_name, 
        customers.name AS customer_name,
        customers.logoImage,
        erga.status, 
        erga.ammount_total, 
        erga.sign_date,

        IFNULL(timologia_agg.total_yes_timologia, 0) AS total_yes_timologia,
        IFNULL(timologia_agg.total_no_timologia, 0) AS total_no_timologia,

        SUM(CASE 
            WHEN paradotea.delivery_date < CURRENT_DATE AND paradotea.timologia_id IS NULL 
            THEN paradotea.ammount_total 
            ELSE 0 
        END) AS demands_no_tim,

        IFNULL(timologia_agg.total_no_timologia, 0) +
        SUM(CASE 
            WHEN paradotea.delivery_date < CURRENT_DATE AND paradotea.timologia_id IS NULL 
            THEN paradotea.ammount_total 
            ELSE 0 
        END) AS demands,

        SUM(CASE 
            WHEN paradotea.delivery_date > CURRENT_DATE AND paradotea.timologia_id IS NULL 
            THEN paradotea.ammount_total 
            ELSE 0 
        END) AS future_demands

    FROM erga
    LEFT JOIN customers ON customers.id = erga.customer_id
    LEFT JOIN paradotea ON paradotea.erga_id = erga.id

    LEFT JOIN (
        SELECT 
            sub.erga_id,
            SUM(CASE WHEN sub.status_paid = 'yes' THEN sub.total ELSE 0 END) AS total_yes_timologia,
            SUM(CASE WHEN sub.status_paid = 'no' THEN sub.total ELSE 0 END) AS total_no_timologia
        FROM (
            SELECT 
                paradotea.erga_id,
                timologia.status_paid,
                (timologia.ammount_of_income_tax_incl + timologia.ammount_parakratisi_eight) AS total
            FROM timologia
            JOIN paradotea ON timologia.id = paradotea.timologia_id
            GROUP BY paradotea.erga_id, timologia.id, timologia.status_paid, timologia.ammount_of_income_tax_incl, timologia.ammount_parakratisi_eight
        ) AS sub
        GROUP BY sub.erga_id
    ) AS timologia_agg ON timologia_agg.erga_id = erga.id

    GROUP BY 
        erga.id, 
        customers.id, 
        timologia_agg.total_yes_timologia,
        timologia_agg.total_no_timologia;
    `;

    try {
        const results = await db.query(query, {
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const getEkxForEsoda = async (req, res) => {
    try {
        const response = await incomes.findAll({
            attributes: ['ekxorimena_timologia_id'],
            include: [{
                model: Ekxorimena_Timologia,
                required: true // Ensures INNER JOIN
            },
        {
            model: Paradotea, // Include the Paradotea model inside Timologia
            include: [{
                model: Erga, // Include the Erga model inside Paradotea
                attributes: ['id', 'name', 'color'], // Specify the attributes 
                include: [{
                    model: Customer,
                    attributes: ['id', 'name']
                }]
            }]
        },
        {
            model: timologia, // Include the Timologia model
            as: 'timologia',
            attributes: ['invoice_number'], // Specify the attributes from Timologia
            required: true // Optional INNER JOIN or LEFT JOIN based on your use case
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