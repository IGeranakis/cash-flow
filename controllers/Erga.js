import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";
import ErgaCategories from "../models/ErgaCategoriesModel.js";
import incomes from "../models/incomesModel.js";
import Ekxorimena_Timologia from "../models/Ekxorimena_TimologiaModel.js";
import timologia from "../models/TimologiaModel.js";
import Paradotea from "../models/ParadoteaModel.js";

export const getErga = async(req,res)=>{

    
    try{
        const response = await Erga.findAll({
            attributes:['id','logoImage','name','color','sign_date',
            'sign_ammount_no_tax','status','estimate_start_date',
            'project_manager','customer_id',
            'shortname','ammount','ammount_vat',
            'ammount_total',
            'estimate_payment_date',
            'estimate_payment_date_2','estimate_payment_date_3','erga_cat_id'],
            include: [{
                model: Customer,
                attributes: ['name'],
            },{
                model: ErgaCategories,
                attributes: ['name'],
            }],


        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getErgaById = async(req,res)=>{
    try{
        const response = await Erga.findOne({
            attributes:['id','logoImage','name','color','sign_date',
            'sign_ammount_no_tax','status','estimate_start_date',
            'project_manager','customer_id',
            'shortname','ammount','ammount_vat',
            'ammount_total',
            'estimate_payment_date',
            'estimate_payment_date_2','estimate_payment_date_3','erga_cat_id'],
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
        estimate_payment_date_2,estimate_payment_date_3,erga_cat_id
    } = req.body;

    // Handle the file upload if it exists
    let logoImage = 'uploads\\nologo.png';
    if (req.file) {
        logoImage = req.file.path;  // Save the path of the uploaded image
    }


    try{
        await Erga.create({
            logoImage:logoImage,
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
            estimate_payment_date_3:estimate_payment_date_3,
            erga_cat_id


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
        estimate_payment_date_2,estimate_payment_date_3,erga_cat_id
    } = req.body;

    // Handle the file upload if a new image is provided
    let logoImage = erga.logoImage;  // Keep existing image if not updated
    if (req.file) {
        logoImage = req.file.path;  // Update the path with the new file
    }

    try{
        await Erga.update({
            logoImage: logoImage,
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
            estimate_payment_date_3:estimate_payment_date_3,
            erga_cat_id
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


export const deleteErga = async (req, res) => {
  const transaction = await db.transaction();

  try {
    const erga = await Erga.findOne({
      where: { id: req.params.id },
      transaction,
    });

    if (!erga) {
      await transaction.rollback();
      return res.status(404).json({ msg: "Erga not found" });
    }

    const paradotea = await Paradotea.findAll({
      where: { erga_id: req.params.id },
      transaction,
    });

    const timologiaIds = paradotea
      .map((p) => p.timologia_id)
      .filter((id) => id !== null && id !== undefined);

    await Paradotea.destroy({
      where: { erga_id: req.params.id },
      transaction,
    });

    if (timologiaIds.length > 0) {
      await Ekxorimena_Timologia.destroy({
        where: { timologia_id: timologiaIds },
        transaction,
      });

      await incomes.destroy({
        where: { timologia_id: timologiaIds },
        transaction,
      });

      await timologia.destroy({
        where: { id: timologiaIds },
        transaction,
      });
    }

    await Erga.destroy({
      where: { id: erga.id },
      transaction,
    });

    await transaction.commit();

    res.status(200).json({ msg: "Erga deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ msg: error.message });
  }
};