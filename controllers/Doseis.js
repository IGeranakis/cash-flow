import Doseis from "../models/DoseisModel.js";

export const getDoseis = async(req,res)=>
    {
        try{
            const response = await Doseis.findAll({
                attributes:['id','ammount', 'actual_payment_date', 'estimate_payment_date', 'status', 'ypoxreoseis_id']
            });
            res.status(200).json(response);
        } catch(error){
            res.status(500).json({msg:error.message});
    
        }
    }

export const getDoseisById = async(req,res)=>
    {
        try{
            const response = await Doseis.findOne({
                attributes:['id','ammount', 'actual_payment_date', 'estimate_payment_date', 'status', 'ypoxreoseis_id'],
                where:{
                    id:req.params.id
                }
            });
            res.status(200).json(response);
    
        } catch (error){
            res.status(500).json({ msg:error.message });
        }
    }

export const createDoseis = async(req,res)=>
    {
        const {ammount, actual_payment_date, estimate_payment_date, status, ypoxreoseis_id} = req.body;
        try{
            await Doseis.create({
                ammount:ammount,
                actual_payment_date:actual_payment_date,
                estimate_payment_date:estimate_payment_date,
                status:status,
                ypoxreoseis_id:ypoxreoseis_id
            });
            res.status(201).json({msg:"Doseis created Succesfully"});
    
        } catch(error){
            res.status(400).json({msg:error.message});
    
        }
    }

    export const updateDoseis = async(req,res)=>
        {
            const dosh = await Doseis.findOne({
                where:{
                    id:req.params.id
                }
            });
        
            if (!dosh) return res.status(404).json({msg:"Doseis not  found"});
            const {ammount,actual_payment_date,estimate_payment_date,status,ypoxreoseis_id} = req.body;
            
            try{
                await Doseis.update({
                    ammount:ammount,
                    actual_payment_date:actual_payment_date,
                    estimate_payment_date:estimate_payment_date,
                    status:status,
                    ypoxreoseis_id:ypoxreoseis_id
                },{
                    where:{
                        id:dosh.id
                    }
                });
                res.status(200).json({msg:"Doseis  update Succesfully"});
            
            } catch(error){
                res.status(400).json({msg:error.message});
            
            }
        }


        export const deleteDoseis = async(req,res)=>{
            const doseis = await Doseis.findOne({
                where:{
                    id:req.params.id
                }
            });
            if (!doseis) return res.status(404).json({msg:"Doseis not found"});
         try{
                await Doseis.destroy({
                    
              
                    where:{
                        id:doseis.id
                    }
                });
                res.status(200).json({msg:"doseis deleted"});
            
            } catch(error){
                res.status(400).json({msg:error.message});
            
            }
        
        }    
