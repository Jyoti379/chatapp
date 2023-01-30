const path = require('path');
//const fs= require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var cors= require('cors');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./utill/database');
const User = require('./model/user');

app.use(cors());


const userRoutes=require('./routes/user')

app.use(bodyParser.json());

app.use('/user',userRoutes);





sequelize.sync()
.then(()=>{
app.listen(3000)
})
.catch(err=>{
    console.log(err)
})
