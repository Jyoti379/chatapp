const Sequelize =require('sequelize');

const sequelize =new Sequelize('chatapp','root','JyotiSQL876',{
    dialect:'mysql',
    host: 'localhost'
})

module.exports = sequelize;