import e from "express";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Ekxorimena_Timologia from "../models/Ekxorimena_TimologiaModel.js";
import {
    updateIncomeEkTimo,
} from "../controllers/Income.js";

export const CreateEkxorimena_Timologia = async(req,res)=>
{
    const {timologia_id, bank_ammount, bank_date,status_bank_paid,cust_date,bank_estimated_date, customer_ammount, cust_estimated_date,status_customer_paid,comments} = req.body;
    try
    {
        const new_ek_timo=await Ekxorimena_Timologia.create({
            
            timologia_id:timologia_id,
            bank_ammount:bank_ammount,
            bank_date: bank_date,
            bank_estimated_date:bank_estimated_date,
            status_bank_paid:status_bank_paid,
            customer_ammount:customer_ammount,
            cust_date:cust_date,
            cust_estimated_date:cust_estimated_date,
            status_customer_paid:status_customer_paid,
            comments:comments,
        });
        const new_ek_timoId=new_ek_timo.id
        console.log("ektimo ID !!!!---->",new_ek_timoId);

        updateIncomeEkTimo(timologia_id,new_ek_timoId,res)

    }
    catch(error)
    {
        res.status(400).json({msg:error.message});
    }
}

export const getEkxorimena_Timologia = async(req,res)=>
{
    try
    {
        const response = await Ekxorimena_Timologia.findAll({
            attributes:['id','timologia_id', 'bank_ammount', 'bank_date','bank_estimated_date','status_bank_paid', 'customer_ammount', 'cust_date','cust_estimated_date','status_customer_paid','comments']
        });
        res.status(200).json(response);
    }
    catch(error)
    {
        res.status(500).json({msg:error.message});
    }
}


export const getEkxorimena_TimologiaById = async(req,res)=>
{
    try
    {
        const response = await Ekxorimena_Timologia.findOne({
            attributes:['id','timologia_id', 'bank_ammount', 'bank_date','bank_estimated_date', 'status_bank_paid','customer_ammount', 'cust_date','cust_estimated_date','status_customer_paid','comments'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch(error)
    {
        res.status(500).json({msg:error.message})
    }
}




export const updateEkxorimena_Timologia = async(req,res)=>
{
    const Ekxorimeno_Timologio = await Ekxorimena_Timologia.findOne({
        where:
        {
            id:req.params.id
        }
    });
    if (!Ekxorimeno_Timologio) return res.status(404).json({msg:"Ekxorimeno Timologio tideak ditek"});
    const {timologia_id, bank_ammount, bank_date,bank_estimated_date,status_bank_paid, customer_ammount, cust_date,cust_estimated_date,status_customer_paid,comments} = req.body;
    try
    {
        const new_ek_timo = await Ekxorimena_Timologia.update({
            timologia_id: timologia_id,
            bank_ammount:bank_ammount,
            bank_date: bank_date,
            bank_estimated_date:bank_estimated_date,
            status_bank_paid:status_bank_paid,
            customer_ammount:customer_ammount,
            cust_date:cust_date,
            cust_estimated_date:cust_estimated_date,
            status_customer_paid:status_customer_paid,
            comments:comments
        },{
            where:{
                id:Ekxorimeno_Timologio.id
            }
        });
        const new_ek_timoId = Ekxorimeno_Timologio.id
        console.log(new_ek_timo)
        // console.log("Timologisaa: ",new_ek_timoId)
        // res.status(200).json({msg:"Ekxorimeno Timologio  update Successfylly"});
        updateIncomeEkTimo(timologia_id,new_ek_timoId,res)
    }
    catch(error)
    {
        res.status(400).json({msg:error.message});
    }
}


export const DeleteEkxorimena_Timologia = async(req,res)=>
{
    const Ekxorimeno_Timologio = await Ekxorimena_Timologia.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!Ekxorimeno_Timologio) return res.status(404).json({msg:"Ekxorimeno timologio tideak ditek"});

   

    
    try
    {
        await Ekxorimena_Timologia.destroy({
            where:{
                id:Ekxorimeno_Timologio.id
            }
        });


        res.status(200).json({msg:"delete succesfull for ekxorisi"});


    }
    catch(error)
    {
        res.status(400).json({msg:error.message});
    }
}