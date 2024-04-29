import e from "express";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import daneia from "../models/DaneiaModel.js";

export const CreateDaneia = async(req,res)=>
{
    const {loan_type, timologia_id} = req.body;
    try
    {
        await daneia.create({
            loan_type:loan_type,
            timologia_id:timologia_id
        });
        res.status(201).json({msg:"Daneia create successfully"});
    }
    catch(error)
    {
        res.status(400).json({msg:error.message});
    }
}
export const getDaneia = async(req,res)=>
{
    try
    {
        const response = await daneia.findAll({
            attributes:['id', 'loan_type', 'createdAt', 'updatedAt', 'timologia_id']
        });
        res.status(200).json(response);
    }
    catch(error)
    {
        res.status(500).json({msg:error.message});
    }
}
export const getDaneiaById = async(req,res)=>
{
    try
    {
        const response = await daneia.findOne({
            attributes:['id', 'loan_type', 'createdAt', 'updatedAt', 'timologia_id'],
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
export const updateDaneia = async(req,res)=>
{
    const Daneio = await daneia.findOne({
        where:
        {
            id:req.params.id
        }
    });
    if (!Daneio) return res.status(404).json({msg:"Daneia tideak ditek"});
    const {loan_type,timologia_id} = req.body;
    try
    {
        await daneia.update({
            loan_type:loan_type,
            timologia_id: timologia_id
        },{
            where:{
                id:Daneio.id
            }
        });
        res.status(200).json({msg:"Daneia  update Successfylly"});
    }
    catch(error)
    {
        res.status(400).json({msg:error.message});
    }
}
export const DeleteDaneia = async(req,res)=>
{
    const Daneio = await daneia.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!Daneio) return res.status(404).json({msg:"Daneia tideak ditek"});
    try
    {
        await daneia.destroy({
            where:{
                id:Daneio.id
            }
        });
        res.status(200).json({msg:"Timologio deleted"});
    }
    catch(error)
    {
        res.status(400).json({msg:error.message});
    }
}