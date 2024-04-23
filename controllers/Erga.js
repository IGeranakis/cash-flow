import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";


export const getErga = async(req,res)=>{

    
    try{
        const response = await Erga.findAll({
            attributes:['id','name','sign_date','sign_ammount_no_tax','status','estimate_start_date','project_manager','customer_id']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}


export const createErga = async(req,res)=>{
    
    const {name,sign_ammount_no_tax,sign_date,status,estimate_start_date,project_manager,customer_id} = req.body;

    try{
        await Erga.create({
            name:name,
            sign_ammount_no_tax:sign_ammount_no_tax,
            sign_date:sign_date,
            status:status,
            estimate_start_date:estimate_start_date,
            project_manager:project_manager,
            customer_id:customer_id

        });
        res.status(201).json({msg:"erga complete"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}