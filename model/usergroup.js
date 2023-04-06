const Sequelize=require('sequelize');
const sequelize=require('../utill/database');

const Usergroup=sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
       primaryKey:true
    }
})

module.exports= Usergroup;