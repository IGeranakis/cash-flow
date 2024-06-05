import Ypoxreoseis from "../models/YpoxreoseisModel.js";

export const getYpoxreoseis = async(req,res)=>
    {
        try{
            const response = await Ypoxreoseis.findAll({
                attributes:['id','provider','invoice_date','total_owed_ammount', 'ammount_vat', 'erga_id']
            });
            res.status(200).json(response);
        } catch(error){
            res.status(500).json({msg:error.message});
    
        }
    
    }

export const getYpoxreoseisById = async(req,res)=>{
        try{
            const response = await Ypoxreoseis.findOne({
                attributes:['id','provider','invoice_date','total_owed_ammount', 'ammount_vat', 'erga_id'],
                where:{
                    id:req.params.id
                }
            });
            res.status(200).json(response);
    
        } catch (error){
            res.status(500).json({ msg:error.message });
        }
        
    }

export const createYpoxreoseis = async(req,res)=>{
    
        const {provider, invoice_date, total_owed_ammount, ammount_vat, erga_id} = req.body;
    
        try{
            await Ypoxreoseis.create({
                provider: provider,
                invoice_date:invoice_date,
                total_owed_ammount:total_owed_ammount,
                ammount_vat:ammount_vat,
                erga_id:erga_id
    
            });
            res.status(201).json({msg:"Ypoxreoseis created Succesfully"});
    
        } catch(error){
            res.status(400).json({msg:error.message});
    
        }
    
    
    }

export const updateYpoxreoseis= async(req,res)=>{
        const ypoxreoseis = await Ypoxreoseis.findOne({
            where:{
                id:req.params.id
            }
        });
    
        if (!ypoxreoseis) return res.status(404).json({msg:"Ypoxreoseis not  found"});
        const {provider, invoice_date, total_owed_ammount, ammount_vat, erga_id} = req.body;
        
        try{
            await Ypoxreoseis.update({
                provider: provider,
                invoice_date:invoice_date,
                total_owed_ammount:total_owed_ammount,
                ammount_vat:ammount_vat,
                erga_id:erga_id
            },{
                where:{
                    id:ypoxreoseis.id
                }
            });
            res.status(200).json({msg:"Ypoxreoseis  update Succesfully"});
        
        } catch(error){
            res.status(400).json({msg:error.message});
        
        }
    
    }

export const deleteYpoxreoseis = async(req,res)=>{
        const ypoxreoseis = await Ypoxreoseis.findOne({
            where:{
                id:req.params.id
            }
        });
        if (!ypoxreoseis) return res.status(404).json({msg:"Ypoxreoseis not found"});
     try{
            await Ypoxreoseis.destroy({
                
          
                where:{
                    id:ypoxreoseis.id
                }
            });
            res.status(200).json({msg:"Ypoxreoseis deleted"});
        
        } catch(error){
            res.status(400).json({msg:error.message});
        
        }
    
    }