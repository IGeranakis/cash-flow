import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Paradotea from "../models/ParadoteaModel.js";


export const getParadotea = async(req,res)=>{

    
    try{
        const response = await Paradotea.findAll({
            attributes:['id','part_number','title','delivery_date','percentage','erga_id','timologia_id']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getParadoteaById = async(req,res)=>{
    try{
        const response = await Paradotea.findOne({
            attributes:['id','part_number','title','delivery_date','percentage','erga_id','timologia_id'],
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
    
    const {part_number,title,delivery_date,percentage,erga_id,timologia_id} = req.body;

    try{
        await Paradotea.create({
            part_number:part_number,
            title:title,
            delivery_date:delivery_date,
            percentage:percentage,
            erga_id:erga_id,
            timologia_id:timologia_id

        });
        res.status(201).json({msg:"Paradotea create successfully"});

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
    const {part_number,title,delivery_date,percentage,erga_id,timologia_id} = req.body;
    
    try{
        await Paradotea.update({
            part_number:part_number,
            title:title,
            delivery_date:delivery_date,
            percentage:percentage,
            erga_id:erga_id,
            timologia_id:timologia_id
        },{
            where:{
                id:paradotea.id
            }
        });
        res.status(200).json({msg:"Paradotea  update Succesfykky"});
    
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
        await Paradotea.destroy({
            
      
            where:{
                id:paradotea.id
            }
        });
        res.status(200).json({msg:"Paradotea deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}