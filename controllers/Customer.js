import e from "express";
//import User from "../models/UserModel.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Erga from "../models/ErgaModel.js";
import Customer from "../models/CustomerModel.js";

function notifyTracker(customer) {
  fetch('https://n8n.cmtprooptiki.gr/webhook/cashflow-customer-sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  }).catch(() => {}); // fire-and-forget
}

export const getCustomer = async(req,res)=>{

    
    try{
        const response = await Customer.findAll({
            attributes:['id',
                        'logoImage',
                        'name','afm','doy','epagelma','phone','email','address','postal_code',
                        'website','facebookUrl','twitterUrl','linkedInUrl','instagramUrl', 'customer_code']
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
                        'website','facebookUrl','twitterUrl','linkedInUrl','instagramUrl', 'customer_code'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    
}


export const createCustomer = async(req, res) => {
  const {name, afm, doy, epagelma, phone, email, address, postal_code, website, facebookUrl, twitterUrl, linkedInUrl, instagramUrl, customer_code} = req.body;

  let logoImage = 'uploads\\nologo.png';
  if (req.file) {
    logoImage = req.file.path;
  }

  try {
    const newCustomer = await Customer.create({  // ← capture the result
      name, logoImage, afm, phone, doy, epagelma, email, address,
      postal_code, website, facebookUrl, twitterUrl, linkedInUrl,
      instagramUrl, customer_code,
    });

    notifyTracker(newCustomer);  // ← add this line

    res.status(201).json({msg: "Customer created Succesfully"});
  } catch(error) {
    res.status(400).json({msg: error.message});
  }
}

export const updateCustomer = async(req, res) => {
  const customer = await Customer.findOne({ where: { id: req.params.id } });
  if (!customer) return res.status(404).json({msg: "Customer not found"});

  const {name, afm, doy, epagelma, phone, email, address, postal_code, website, facebookUrl, twitterUrl, linkedInUrl, instagramUrl, customer_code} = req.body;

  let logoImage = customer.logoImage;
  if (req.file) {
    logoImage = req.file.path;
  }

  try {
    await Customer.update({
      name, logoImage, afm, doy, epagelma, phone, email, address,
      postal_code, website, facebookUrl, twitterUrl, linkedInUrl,
      instagramUrl, customer_code,
    }, {
      where: { id: customer.id }
    });

    notifyTracker({ id: customer.id, name, customer_code, epagelma, email, phone, afm, doy, address, website });  // ← add this line

    res.status(200).json({msg: "Customer update Successfully"});
  } catch(error) {
    res.status(400).json({msg: error.message});
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


