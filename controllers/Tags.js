import Tags from "../models/TagsModel.js";

export const getTags = async(req,res)=>
    {
        try{
            const response = await Tags.findAll({
                attributes:['id','name']
            });
            res.status(200).json(response);
        } catch(error){
            res.status(500).json({msg:error.message});
    
        }
    }

export const getTagsById = async(req,res)=>
    {
        try{
            const response = await Tags.findOne({
                attributes:['id','name'],
                where:{
                    id:req.params.id
                }
            });
            res.status(200).json(response);
    
        } catch (error){
            res.status(500).json({ msg:error.message });
        }
    }

export const createTags = async(req,res)=>
    {
        const {name} = req.body;
        try{
            await Tags.create({
                name:name
            });
            res.status(201).json({msg:"Tags created Succesfully"});
    
        } catch(error){
            res.status(400).json({msg:error.message});
    
        }
    }

export const updateTags = async(req,res)=>
    {
        const tag = await Tags.findOne({
            where:{
                id:req.params.id
            }
        });
    
        if (!tag) return res.status(404).json({msg:"Tags not  found"});
        const {name} = req.body;
        
        try{
            await Tags.update({
                name:name
            },{
                where:{
                    id:tag.id
                }
            });
            res.status(200).json({msg:"Tags  update Succesfully"});
        
        } catch(error){
            res.status(400).json({msg:error.message});
        
        }
    }

    export const deleteTags = async(req,res)=>{
        const Tag = await Tags.findOne({
            where:{
                id:req.params.id
            }
        });
        if (!Tag) return res.status(404).json({msg:"Tag not found"});
     try{
            await Tags.destroy({
                
          
                where:{
                    id:Tag.id
                }
            });
            res.status(200).json({msg:"Tag deleted"});
        
        } catch(error){
            res.status(400).json({msg:error.message});
        
        }
    
    }