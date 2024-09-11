import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Budget from "../models/BudgetModel.js";

export const getBudget = async(req,res) =>
{
    try{
        const response = await Budget.findAll({
            attributes:['id','ammount','date']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }
}

export const getBudgetById = async(req,res)=>{
    try{
        const response = await Budget.findOne({
            attributes:['id','ammount','date'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}

export const createBudget = async(req,res)=>{
    
    const {ammount,date} = req.body;

    try{
        await Budget.create({
            ammount:ammount,
            date:date
        });
        res.status(201).json({msg:"Budget created Succesfully"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}

export const updateBudget= async(req,res)=>{
    const budget = await Budget.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!budget) return res.status(404).json({msg:"Budget not  found"});
    const {ammount, date} = req.body;
    
    try{
        await Budget.update({
            ammount: ammount,
            date:date
        },{
            where:{
                id:budget.id
            }
        });
        res.status(200).json({msg:"Budget  update Succesfykky"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}

export const deleteBudget = async(req,res)=>{
    const budget = await Budget.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!budget) return res.status(404).json({msg:"Budget not found"});
 try{
        await Budget.destroy({
            
      
            where:{
                id:budget.id
            }
        });
        res.status(200).json({msg:"Budget deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}
