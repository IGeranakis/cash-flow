import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Paradotea from "../models/ParadoteaModel.js";
import incomes from "../models/incomesModel.js";
import Erga from "../models/ErgaModel.js";
import timologia from "../models/TimologiaModel.js";
import {
    createIncome,
    updateIncome,
    deleteIncome
    
} from "../controllers/Income.js";
import { getErgaById } from "./Erga.js";
import { Op } from "sequelize";

export const getParadotea = async(req,res)=>{

    
    try{
        const response = await Paradotea.findAll({
            attributes:['id','part_number','title',
                'delivery_date','percentage',
                'erga_id','timologia_id','ammount',
                'ammount_vat','ammount_total','estimate_payment_date',
                'estimate_payment_date_2','estimate_payment_date_3'],
                include: [{
                    model: Erga,
                    attributes: ['name'],
                    // required: true // This acts as the INNER JOIN condition
                },
                {
                    model: timologia,
                    attributes: ['invoice_number'],
                    as: 'timologia'

                }]
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getParadoteaById = async(req,res)=>{
    try{
        const response = await Paradotea.findOne({
            attributes:['id','part_number','title','delivery_date','percentage','erga_id','timologia_id','ammount','ammount_vat','ammount_total','estimate_payment_date','estimate_payment_date_2','estimate_payment_date_3'],
            include: [{
                model: Erga,
                attributes: ['name'],
                // required: true // This acts as the INNER JOIN condition
            },
            {
                model: timologia,
                attributes: ['invoice_number'],
                as: 'timologia'

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


export const createParadotea = async(req,res)=>{
    
    const {part_number,title,delivery_date,percentage,erga_id,timologia_id,ammount,ammount_vat,ammount_total,estimate_payment_date,estimate_payment_date_2,estimate_payment_date_3} = req.body;

    try{
        const newParadotea = await Paradotea.create({
            part_number:part_number,
            title:title,
            delivery_date:delivery_date,
            percentage:percentage,
            erga_id:erga_id,
            timologia_id:timologia_id,
            ammount:ammount,
            ammount_vat:ammount_vat,
            ammount_total:ammount_total,
            estimate_payment_date:estimate_payment_date,
            estimate_payment_date_2:estimate_payment_date_2,
            estimate_payment_date_3:estimate_payment_date_3
            
            
        });
        const paradoteaId=newParadotea.id
        createIncome(paradoteaId,timologia_id,null,res)
        
        // if(timologia_id!=null){
        //     await incomes.create({
        //         type:"timologio",
        //         income_id:timologia_id,
        //         name:"erga2"
    
        //     });
        // }else{
        //     const paradoteaId=newParadotea.id
        //     await incomes.create({
        //         type:"paradoteo",
        //         income_id:paradoteaId,
        //         name:"erga3"
    
        //     });
        // }
        
        //res.status(201).json({msg:"Paradotea create successfully"});
        

    } catch(error){
        res.status(400).json({msg:error.message});

    }
    

}


export const updateParadotea= async(req,res)=>{
    const paradotea = await Paradotea.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!paradotea) return res.status(404).json({msg:"paradotea not  found"});
    const {part_number,title,delivery_date,percentage,erga_id,timologia_id,ammount,ammount_vat,ammount_total,estimate_payment_date,estimate_payment_date_2,estimate_payment_date_3} = req.body;
    
    try{
        const newParadotea=await Paradotea.update({
            part_number:part_number,
            title:title,
            delivery_date:delivery_date,
            percentage:percentage,
            erga_id:erga_id,
            timologia_id:timologia_id,
            ammount:ammount,
            ammount_vat:ammount_vat,
            ammount_total:ammount_total,
            estimate_payment_date:estimate_payment_date,
            estimate_payment_date_2:estimate_payment_date_2,
            estimate_payment_date_3:estimate_payment_date_3
        },{
            where:{
                id:paradotea.id
            }
        });
        
        const paradoteaId=paradotea.id
       console.log("PARADOTEA ID !!!!---->",paradoteaId);
        updateIncome(paradoteaId,timologia_id,null,res)

        // if(timologia_id!=null){
        //     const paradoteaId=newParadotea.id
        //     await incomes.update({
        //         type:"timologio",
        //         income_id:timologia_id,
        //         name:"erga2"
    
        //     },{   
        //         where: {   
        //             income_id: paradoteaId,   type: 'paradotea',   [Sequelize.Op.not]: Sequelize.literal(`
        //                EXISTS (   
        //                 SELECT 1  
        //                  FROM (SELECT * FROM Incomes) AS temp  
        //                   WHERE income_id = `+timologia_id+`  
        //                   AND type = 'timologio'   )   `)  
        //     }});
        // }else{
        //     const paradoteaId=newParadotea.id
        //     await incomes.create({
        //         type:"paradoteo",
        //         income_id:paradoteaId,
        //         name:"erga3"
    
        //     });
        //}
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}


export const deleteParadotea = async(req,res)=>{
    const paradotea = await Paradotea.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!paradotea) return res.status(404).json({msg:"paradotea not found"});
 try{
    if(paradotea.timologia_id != null && paradotea.erga_id != null)
        {
            await paradotea.update(
                { timologia_id: null,
                  erga_id: null
                 }
                );
        }
    
        
        
   
        const newpar=await Paradotea.destroy({
            
      
            where:{
                id:paradotea.id
            }
        });

        return res.status(200).json({msg:"Paradoteo deleted"})        

    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}
