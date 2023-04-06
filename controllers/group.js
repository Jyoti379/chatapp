const Group=require('../model/group');
const User=require('../model/user');
const Usergroup=require('../model/usergroup')
const Message=require('../model/message');
const userController=require('../controllers/user')

let users=[];
let groupset=[];




exports.postGroup=async (req,res,next)=>{
    try{
       const {groupname}=req.body;
      
       console.log(groupname);
      const groupdata= await Group.create({groupname:groupname})
      res.status(201).json({Data:groupdata,message:'new group added'})

    }catch(err){
    res.status(500).json({success:false,message:'something went wrong'})  
    }
}

exports.getGroup=async (req,res,next)=>{
  try{
    Group.findAll()
    .then(groups=>{
      console.log(groups)
      res.status(200).json({groups:groups})
    })
  }catch(err){

  }
}

exports.addUser=async (req,res,next)=>{
    try{
     const username=req.body.username;
     const groupId=req.body.groupId
     console.log(username);
     console.log(groupId)
   User.findOne({where:{name:username}})
    .then(user=>{
       // console.log(user);
       
     users.push(user.name);
    
     console.log(users)
      
     res.status(201).json({success:true,users:[...new Set(users)],date:new Date()})
    })
    
   }catch(err){
      res.status(500).json({success:false,message:'something went wrong'})
    }
    
}

exports.addgroup= async (req,res,next)=>{
 try{
 const {username,groupname}=req.body;
  console.log(username,groupname);
  console.log(req.user)
  req.user.update({isPremium:true})
 User.findAll({where:{name:username}})
  .then(user=>{
  console.log(user)
  users.push(user[0].id)
  console.log(users)
 return user[0].createGroup({groupname:groupname})
 .then(group=>{
  console.log(group)
 
  res.status(200).json({user:user,group:group,currentUser:req.user})

 })


  // .then(group=>{
 //   console.log(group)
   /*return group[0].addUsers(
    users.map(user=>{
     user.usergroup
      return user;
     })
   )*/

  // })

 })
 .catch(err=>{
  throw new Error(err);
})

 }catch(err){
res.status(500).json({sucess:false})
  }

}

exports.getGroupMessage= async (req,res,next)=>{
  try{
  const groupId=req.query.groupId;
  console.log(groupId);
  Message.findAll({where:{groupId:groupId}})
  .then(message=>{
    console.log(message)
    res.status(200).json({message:message})
  })
  .catch(err=>{
    throw new Error(err)
  })
  
  }
  catch(err){
    res.status(404).json({message:'user logged out',err:err})
  }
  

}

exports.logoutuser=async (req,res,nex)=>{
  try{
    const logoutuser=req.body.userlog;
   // console.log(logoutuser);
   groupset.push(logoutuser)
   console.log(groupset)
   //groupset.pop()
    res.status(200).json({logout:[...new Set(groupset)]})
  }
  catch(err){

  }
}
exports.groupAdmin= async(req,res,next)=>{
  try{
    const groupId=req.body.groupnme;
    console.log(groupId)
   Usergroup.findAll({where:{groupId:groupId}})
   .then(admin=>{
  console.log(admin)
  res.status(200).json({groupAdmin:admin})
   })
  }
  catch(err){
    res.status(500).json({success:false})
  }
}