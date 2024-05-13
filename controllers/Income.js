import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";
import incomes from "../models/incomesModel.js"
import Ekxorimena_Timologia from "../models/Ekxorimena_TimologiaModel.js";

export const getIncome = async(req,res)=>{

    
    try{
        const response = await incomes.findAll({
            attributes:['id','paradotea_erga_id','paradotea_timologia_id','paradotea_id','timologia_id','ekxorimena_timologia_id']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getIncomeById = async(req,res)=>{
    try{
        const response = await incomes.findOne({
            attributes:['id','paradotea_erga_id','paradotea_timologia_id','paradotea_id','timologia_id','ekxorimena_timologia_id'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}




export const createIncome = async(paradotea_erga_id,paradotea_timologia_id,paradotea_id,timologia_id,ekxorimena_timologia_id,res)=>{
    
    //CHECK IF EKXORIMENA TIMOLOGIA EXISTS WITH THE TIMOLOGIA ID WE UPDATE FROM PARADOTEA, IF NOT...NULL
    if(timologia_id!=null){
        const check_exk=await Ekxorimena_Timologia.findOne({
            where:{
                timologia_id:timologia_id
            }
        })
    
        if(check_exk){
            ekxorimena_timologia_id=check_exk.id
        }
        else{
            ekxorimena_timologia_id=null
        }
    }

    try{
        await incomes.create({
            paradotea_erga_id:paradotea_erga_id,
            paradotea_timologia_id:paradotea_timologia_id,
            paradotea_id:paradotea_id,
            timologia_id:timologia_id,
            ekxorimena_timologia_id:ekxorimena_timologia_id

        });
        res.status(201).json({msg:"Income created Succesfully"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }
    

}


export const updateIncome= async(paradotea_erga_id,paradotea_timologia_id,paradotea_id,timologia_id,ekxorimena_timologia_id,res)=>{
    const income = await incomes.findOne({
        where:{
            paradotea_id:paradotea_id
        }
    });

    if (!income) return res.status(404).json({msg:"Income not found with this paradotea ID"});
    
    //CHECK IF EKXORIMENA TIMOLOGIA EXISTS WITH THE TIMOLOGIA ID WE UPDATE FROM PARADOTEA, IF NOT...NULL 
    if(timologia_id!=null){ 
        const check_exk=await Ekxorimena_Timologia.findOne({
            where:{
                timologia_id:timologia_id
            }
        })

        if(check_exk){
            ekxorimena_timologia_id=check_exk.id
        }
        else{
            ekxorimena_timologia_id=null
        }
    }
    try{
        await incomes.update({
            paradotea_erga_id:paradotea_erga_id,
            paradotea_timologia_id:paradotea_timologia_id,
            paradotea_id:paradotea_id,
            timologia_id:timologia_id,
            ekxorimena_timologia_id:ekxorimena_timologia_id

        },{
            where:{
                id:income.id
            }
        });
        res.status(200).json({msg:"Income  update Succesfully"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}

export const deleteIncome = async(req,res)=>{
    const income = await incomes.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!income) return res.status(404).json({msg:"Income not found"});
 try{
        await incomes.destroy({
            
      
            where:{
                id:income.id
            }
        });
        res.status(200).json({msg:"income deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}


