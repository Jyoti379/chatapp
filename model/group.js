const Sequelize= require('sequelize');
const sequelize=require('../utill/database');

const Group= sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
       primaryKey:true
    },
    groupname:{
        type:Sequelize.STRING
    }
})

module.exports=Group;