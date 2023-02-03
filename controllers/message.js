const Message=require('../model/message');
const User=require('../model/user');
const jwt= require('jsonwebtoken');

exports.addMessage = async (req,res)=>{
    try{
     const {msg,username}=req.body;
     console.log(msg);
     console.log(username);

     const data= await Message.create({msg:msg,username:req.user.name,userId:req.user.id});
     res.status(201).json({msg:data,username:req.user.name,message:'message sent'});

    }catch(err){
        res.status(500).json({error:err})
    }
}
exports.getMessage= async (req,res)=>{
    try{
      
     return Message.findAll()
        .then(messages=>{
            res.status(200).json({msg:messages,username:req.user.name,success:true})
        })
       

    }catch(err){
        res.status(500).json({error:err}) 
    }
}