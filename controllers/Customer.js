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
            attributes:['id',
                        'logoImage',
                        'name','afm','doy','epagelma','phone','email','address','postal_code',
                        'website','facebookUrl','twitterUrl','linkedInUrl','instagramUrl']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg:error.message});

    }

}

export const getCustomerById = async(req,res)=>{
    try{
        const response = await Customer.findOne({
            attributes:['id',
                        'logoImage',
                        'name','afm','doy','epagelma','phone','email','address','postal_code',
                        'website','facebookUrl','twitterUrl','linkedInUrl','instagramUrl'],
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
    
    const {name,afm,doy,epagelma,phone,email,address,postal_code,website,facebookUrl,twitterUrl,linkedInUrl,instagramUrl} = req.body;


      // Handle the file upload if it exists
      let logoImage = 'uploads\\nologo.png';
      if (req.file) {
          logoImage = req.file.path;  // Save the path of the uploaded image
      }
  
    try{
        await Customer.create({
            name:name,
            logoImage:logoImage,
            afm:afm,
            phone:phone,
            doy:doy,
            epagelma:epagelma,
            email:email,
            address:address,
            postal_code:postal_code,
            website:website,
            facebookUrl:facebookUrl,
            twitterUrl:twitterUrl,
            linkedInUrl:linkedInUrl,
            instagramUrl:instagramUrl

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
    const {name,afm,doy,epagelma,phone,email,address,postal_code,website,facebookUrl,twitterUrl,linkedInUrl,instagramUrl} = req.body;
     // Handle the file upload if a new image is provided
     let logoImage = erga.logoImage;  // Keep existing image if not updated
     if (req.file) {
         logoImage = req.file.path;  // Update the path with the new file
     }
    try{
        await Customer.update({
            name:name,
            logoImage: logoImage,
            afm:afm,
            doy:doy,
            epagelma:epagelma,
            phone:phone,
            email:email,
            address:address,
            postal_code:postal_code,
            website:website,
            facebookUrl:facebookUrl,
            twitterUrl:twitterUrl,
            linkedInUrl:linkedInUrl,
            instagramUrl:instagramUrl
 
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


