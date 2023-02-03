const Sequelize=require('sequelize');
const sequelize=require('../utill/database');

const message=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
       primaryKey:true
    },
    msg:{
        type:Sequelize.STRING,
    },
    username:{
        type:Sequelize.STRING,
    }
})

module.exports=message