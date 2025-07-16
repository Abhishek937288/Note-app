

import userModel from "../models/userModel.js";

export const userInfo =  async (req , res)=>{
 try{
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if(!user){
        return res.json({data:null,success:false,message:"no userFound"})
    }
    res.json({data:user,success:true,message:"user found succesfully"});
 }catch(err){
    return res.json({data:null,success:false,message:`error ${err.message}`})
 }
}