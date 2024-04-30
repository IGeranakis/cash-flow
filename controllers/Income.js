import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";
import incomes from "../models/incomesModel.js";

export const getIncome = async(req,res)=>{

    
    try{
        const response = await incomes.findAll({
            attributes:['id','type','income_id','name']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getIncomeById = async(req,res)=>{
    try{
        const response = await incomes.findOne({
            attributes:['id','type','income_id','name'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}




export const createIncome = async(req,res)=>{
    
    const {type,income_id,name} = req.body;

    try{
        await Customer.create({
            type:type,
            income_id:income_id,
            name:name,

        });
        res.status(201).json({msg:"Income created Succesfully"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}


export const updateIncome= async(req,res)=>{
    const income = await Customer.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!income) return res.status(404).json({msg:"Customer not  found"});
    const {type,income_id,name} = req.body;
    
    try{
        await incomes.update({
            type:type,
            income_id:income_id,
            name:name,

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
    const income = await Customer.findOne({
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


