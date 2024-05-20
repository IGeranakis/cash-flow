import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";


export const getErga = async(req,res)=>{

    
    try{
        const response = await Erga.findAll({
            attributes:['id','name','color','sign_date',
            'sign_ammount_no_tax','status','estimate_start_date',
            'project_manager','customer_id',
            'shortname','ammount','ammount_vat',
            'ammount_total',
            'estimate_payment_date',
            'estimate_payment_date_2','estimate_payment_date_3']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getErgaById = async(req,res)=>{
    try{
        const response = await Erga.findOne({
            attributes:['id','name','color','sign_date',
            'sign_ammount_no_tax','status','estimate_start_date',
            'project_manager','customer_id',
            'shortname','ammount','ammount_vat',
            'ammount_total',
            'estimate_payment_date',
            'estimate_payment_date_2','estimate_payment_date_3'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}


export const createErga = async(req,res)=>{
    
    const {name,color,sign_ammount_no_tax,sign_date,
        status,estimate_start_date,
        project_manager,customer_id,
        shortname,ammount,ammount_vat,
        ammount_total,
        estimate_payment_date,
        estimate_payment_date_2,estimate_payment_date_3
    } = req.body;

    try{
        await Erga.create({
            name:name,
            color:color,
            sign_ammount_no_tax:sign_ammount_no_tax,
            sign_date:sign_date,
            status:status,
            estimate_start_date:estimate_start_date,
            project_manager:project_manager,
            customer_id:customer_id,
            shortname: shortname,
            ammount:ammount,
            ammount_vat:ammount_vat,
            ammount_total:ammount_total,
            estimate_payment_date:estimate_payment_date,
            estimate_payment_date_2:estimate_payment_date_2,
            estimate_payment_date_3:estimate_payment_date_3


        });
        res.status(201).json({msg:"erga complete"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}


export const updateErga= async(req,res)=>{
    const erga = await Erga.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!erga) return res.status(404).json({msg:"erga not  found"});
    const {name,color,sign_ammount_no_tax,sign_date,
        status,estimate_start_date,
        project_manager,customer_id,
        shortname,ammount,ammount_vat,
        ammount_total,
        estimate_payment_date,
        estimate_payment_date_2,estimate_payment_date_3
    } = req.body;

    try{
        await Erga.update({
            name:name,
            color:color,
            sign_ammount_no_tax:sign_ammount_no_tax,
            sign_date:sign_date,
            status:status,
            estimate_start_date:estimate_start_date,
            project_manager:project_manager,
            customer_id:customer_id,
            shortname: shortname,
            ammount:ammount,
            ammount_vat:ammount_vat,
            ammount_total:ammount_total,
            estimate_payment_date:estimate_payment_date,
            estimate_payment_date_2:estimate_payment_date_2,
            estimate_payment_date_3:estimate_payment_date_3
        },{
            where:{
                id:erga.id
            }
        });
        res.status(200).json({msg:"Erga  update Succesfykky"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}


export const deleteErga = async(req,res)=>{
    const erga = await Erga.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!erga) return res.status(404).json({msg:"erga not found"});
 try{
        await Erga.destroy({
            
      
            where:{
                id:erga.id
            }
        });
        res.status(200).json({msg:"Erga deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}