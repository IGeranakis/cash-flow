import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";

export const getCustomer = async(req,res)=>{

    
    try{
        const response = await Customer.findAll({
            attributes:['id','name','afm','phone','email','address','postal_code']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getCustomerById = async(req,res)=>{
    try{
        const response = await Customer.findOne({
            attributes:['id','name','afm','phone','email','address','postal_code'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}




export const createCustomer = async(req,res)=>{
    
    const {name,afm,phone,email,address,postal_code} = req.body;

    try{
        await Customer.create({
            name:name,
            afm:afm,
            phone:phone,
            email:email,
            address:address,
            postal_code:postal_code

        });
        res.status(201).json({msg:"Customer created Succesfully"});

    } catch(error){
        res.status(400).json({msg:error.message});

    }


}


export const updateCustomer= async(req,res)=>{
    const customer = await Customer.findOne({
        where:{
            id:req.params.id
        }
    });

    if (!customer) return res.status(404).json({msg:"Customer not  found"});
    const {name,afm,phone,email,address,postal_code} = req.body;
    
    try{
        await Customer.update({
            name:name,
            afm:afm,
            phone:phone,
            email:email,
            address:address,
            postal_code:postal_code
        },{
            where:{
                id:customer.id
            }
        });
        res.status(200).json({msg:"Customer  update Succesfykky"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}

export const deleteCustomer = async(req,res)=>{
    const customer = await Customer.findOne({
        where:{
            id:req.params.id
        }
    });
    if (!customer) return res.status(404).json({msg:"Customer not found"});
 try{
        await Customer.destroy({
            
      
            where:{
                id:customer.id
            }
        });
        res.status(200).json({msg:"Customer deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}


