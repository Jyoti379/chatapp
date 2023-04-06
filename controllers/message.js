const Message=require('../model/message');
const User=require('../model/user');
const jwt= require('jsonwebtoken');

exports.addMessage = async (req,res)=>{
    try{
     const {msg,Imagefile,username,groupId}=req.body;
     console.log(msg);
     console.log(username);
     console.log(groupId);
     console.log(Imagefile);


     const data= await Message.create({msg:msg,imageUrl:Imagefile,username:req.user.name,userId:req.user.id,groupId:groupId});
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
exports.getUsers= async (req,res)=>{
    try{
     return User.findAll()
     .then(users=>{
        res.status(200).json({users:users,})
     })
     .catch(err=>{
        throw new Error(err);
     })
    }catch(err){
        res.status(500).json({error:err})   
    }
}