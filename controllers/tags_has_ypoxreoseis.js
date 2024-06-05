import tags_has_ypoxreoseis from '../models/tags_has_ypoxreoseisModel.js'

export const getTags_Has_Ypoxreoseis = async(req,res)=>
    {
        try{
            const response = await tags_has_ypoxreoseis.findAll({
                attributes:['id','ypoxreoseis_id', 'tags_id']
            });
            res.status(200).json(response);
        } catch(error){
            res.status(500).json({msg:error.message});
    
        }
    }

    export const getTags_Has_YpoxreoseisById = async(req,res)=>
        {
            try{
                const response = await tags_has_ypoxreoseis.findOne({
                    attributes:['id','ypoxreoseis_id', 'tags_id'],
                    where:{
                        id:req.params.id
                    }
                });
                res.status(200).json(response);
        
            } catch (error){
                res.status(500).json({ msg:error.message });
            }
        }

export const create_Tags_Has_Ypoxreoseis = async(req,res)=>
    {
        const {ypoxreoseis_id,tags_id} = req.body;
        try{
            await tags_has_ypoxreoseis.create({
                ypoxreoseis_id:ypoxreoseis_id,
                tags_id:tags_id
            });
            res.status(201).json({msg:"tags_has_ypoxreoseis created Succesfully"});
    
        } catch(error){
            res.status(400).json({msg:error.message});
    
        }
    }

    export const update_Tags_Has_Ypoxreoseis = async(req,res)=>
        {
            const tag_has_ypoxreosh = await tags_has_ypoxreoseis.findOne({
                where:{
                    id:req.params.id
                }
            });
        
            if (!tag_has_ypoxreosh) return res.status(404).json({msg:"tag_has_ypoxreosh not  found"});
            const {ypoxreoseis_id,tags_id} = req.body;
            
            try{
                await tags_has_ypoxreoseis.update({
                    ypoxreoseis_id:ypoxreoseis_id,
                    tags_id:tags_id
                },{
                    where:{
                        id:tag_has_ypoxreosh.id
                    }
                });
                res.status(200).json({msg:"Tags_has_ypoxreosh  update Succesfully"});
            
            } catch(error){
                res.status(400).json({msg:error.message});
            
            }
        }

export const delete_Tags_Has_Ypoxreoseis = async(req,res)=>
    {
        const tag_has_ypoxreosh = await tags_has_ypoxreoseis.findOne({
            where:{
                id:req.params.id
            }
        });
        if (!tag_has_ypoxreosh) return res.status(404).json({msg:"tag_has_ypoxreosh not found"});
     try{
            await tags_has_ypoxreoseis.destroy({
                
          
                where:{
                    id:tag_has_ypoxreosh.id
                }
            });
            res.status(200).json({msg:"tags_has_ypoxreosh deleted"});
        
        } catch(error){
            res.status(400).json({msg:error.message});
        
        }
    }