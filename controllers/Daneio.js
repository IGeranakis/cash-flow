import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";
import Daneia from "../models/DaneiaModel.js";

export const getDaneia = async(req,res)=>{

    
    try{
        const response = await Daneia.findAll({
            attributes:['id','name','ammount','status', 'payment_date']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getDaneiaById = async(req,res)=>{
    try{
        const response = await Daneia.findOne({
            attributes:['id','name','ammount','status', 'payment_date'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}




export const createDaneia = async(req,res)=>{
    
    const {name,ammount,status, payment_date} = req.body;

    try{
        await Daneia.create({
            name:name,
            ammount:ammount,
            status:status,
            payment_date: payment_date

        });
        res.status(201).json({msg:"Daneia created Succesfully"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}


export const updateDaneia= async(req,res)=>{
    const daneio = await Daneia.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!daneio) return res.status(404).json({msg:"Daneio not  found"});
    const {name,ammount,status, payment_date} = req.body;
    
    try{
        await Daneia.update({
            name:name,
            ammount:ammount,
            status:status,
            payment_date:payment_date
        },{
            where:{
                id:daneio.id
            }
        });
        res.status(200).json({msg:"Daneio  update Succesfully"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}

export const deleteDaneia = async(req,res)=>{
    const daneio = await Daneia.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!daneio) return res.status(404).json({msg:"Daneio not found"});
 try{
        await Daneia.destroy({
            
      
            where:{
                id:daneio.id
            }
        });
        res.status(200).json({msg:"Daneio deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}


