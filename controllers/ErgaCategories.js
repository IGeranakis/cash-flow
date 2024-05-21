import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import ErgaCategories from "../models/ErgaCategoriesModel.js";

export const getErgaCat = async(req,res)=>{

    
    try{
        const response = await ErgaCategories.findAll({
            attributes:['id','name']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getErgaCatById = async(req,res)=>{
    try{
        const response = await ErgaCategories.findOne({
            attributes:['id','name'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}


export const creategetErgaCat = async(req,res)=>{
    
    const {name} = req.body;

    try{
        await ErgaCategories.create({
            name:name
        });
        res.status(201).json({msg:"erga cat complete"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}


export const updategetErgaCat= async(req,res)=>{
    const ergacat = await ErgaCategories.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!ergacat) return res.status(404).json({msg:"erga cat not  found"});
    const {name} = req.body;

    try{
        await ErgaCategories.update({
            name:name,
        },{
            where:{
                id:ergacat.id
            }
        });
        res.status(200).json({msg:"Erga cat update Successfully"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}


export const deletegetErgaCat = async(req,res)=>{
    const ergacat = await ErgaCategories.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!ergacat) return res.status(404).json({msg:"erga cat not found"});
 try{
        await ErgaCategories.destroy({
            
      
            where:{
                id:ergacat.id
            }
        });
        res.status(200).json({msg:"Erga cat deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}