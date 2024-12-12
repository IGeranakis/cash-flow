import Doseis from "../models/DoseisModel.js";
import Ypoxreoseis from "../models/YpoxreoseisModel.js";
import tags_has_ypoxreoseis from "../models/tags_has_ypoxreoseisModel.js";
import db from "../config/Database.js";
import {Op, Sequelize } from "sequelize";
import Tags from "../models/TagsModel.js";

export const getDoseis = async(req,res)=>
    {
        try {
            const query = `
                SELECT 
                    doseis.id AS doseis_id, 
                    doseis.ammount, 
                    doseis.actual_payment_date, 
                    doseis.estimate_payment_date, 
                    doseis.status, 
                    doseis.comment,
                    ypoxreoseis.provider,
                    tags_has_ypoxreoseis.id AS tag_relation_id,
                    tags_has_ypoxreoseis.tags_id,
                    GROUP_CONCAT(tags.name) AS tag_name
                FROM doseis
                LEFT JOIN ypoxreoseis ON doseis.ypoxreoseis_id = ypoxreoseis.id
                LEFT JOIN tags_has_ypoxreoseis ON tags_has_ypoxreoseis.ypoxreoseis_id = ypoxreoseis.id
                LEFT JOIN tags ON tags.id = tags_has_ypoxreoseis.tags_id
                GROUP BY doseis.id, ypoxreoseis.id
            `;
            const [results] = await db.query(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

export const getDoseisById = async(req,res)=>
    {
        try{
            const response = await Doseis.findOne({
                attributes:['id','ammount', 'actual_payment_date', 'estimate_payment_date', 'status', 'ypoxreoseis_id', 'comment'],
                include: [{
                    model: Ypoxreoseis,
                    attributes: ['provider']

                    // required: true // This acts as the INNER JOIN condition
                }],
                where:{
                    id:req.params.id
                }
            });
            res.status(200).json(response);
    
        } catch (error){
            res.status(500).json({ msg:error.message });
        }
    }

export const createDoseis = async(req,res)=>
    {
        const {ammount, actual_payment_date, estimate_payment_date, status, ypoxreoseis_id, comment} = req.body;
        try{
            await Doseis.create({
                ammount:ammount,
                actual_payment_date:actual_payment_date,
                estimate_payment_date:estimate_payment_date,
                status:status,
                ypoxreoseis_id:ypoxreoseis_id,
                comment: comment
            });
            res.status(201).json({msg:"Doseis created Succesfully"});
    
        } catch(error){
            res.status(400).json({msg:error.message});
    
        }
    }

    export const createMultiDoseis = async (req, res) => {
        const {paramAmmount,paramStatus,paramYpoxreoseisId, paramStartDate, paramEndDate, paramDay} = req.body;
        const query = `
        CALL multiDoseis (${paramAmmount}, '${paramStatus}',${paramYpoxreoseisId},'${paramStartDate}','${paramEndDate}',${paramDay});
        `; 
        // const query = `
        // CALL multiDoseis (10, 'yes',19,'2025-01-01','2025-05-01',18);
        // `;
    
        try {
            const results = await db.query(query, {
                type: Sequelize.QueryTypes.RAW // Specify the type of query
            });
    
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    };

    export const updateDoseis = async(req,res)=>
        {
            const dosh = await Doseis.findOne({
                where:{
                    id:req.params.id
                }
            });
        
            if (!dosh) return res.status(404).json({msg:"Doseis not  found"});
            const {ammount,actual_payment_date,estimate_payment_date,status,ypoxreoseis_id, comment} = req.body;
            
            try{
                await Doseis.update({
                    ammount:ammount,
                    actual_payment_date:actual_payment_date,
                    estimate_payment_date:estimate_payment_date,
                    status:status,
                    ypoxreoseis_id:ypoxreoseis_id,
                    comment: comment
                },{
                    where:{
                        id:dosh.id
                    }
                });

                // Step 4: Calculate the sum of the 'ammount' column for the matching 'ypoxreoseis_id'
                const sumResult = await Doseis.sum('ammount', {
                    where: {
                        ypoxreoseis_id: dosh.ypoxreoseis_id
                    }
                });
 
                // Step 5: Update the ypoxreoseis table with the calculated sum
                await Ypoxreoseis.update({
                    total_owed_ammount: sumResult
                }, {
                    where: {
                        id: dosh.ypoxreoseis_id
                    }
                });




                res.status(200).json({msg:"Doseis  update Succesfully"});
            
            } catch(error){
                res.status(400).json({msg:error.message});
            
            }

            




        }


        export const deleteDoseis = async(req,res)=>{
            const doseis = await Doseis.findOne({
                where:{
                    id:req.params.id
                }
            });
            if (!doseis) return res.status(404).json({msg:"Doseis not found"});
         try{
                await Doseis.destroy({
                    
              
                    where:{
                        id:doseis.id
                    }
                });
                res.status(200).json({msg:"doseis deleted"});
            
            } catch(error){
                res.status(400).json({msg:error.message});
            
            }
        
        }    
