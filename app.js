const path = require ('path');
const fs= require('fs');
const http=require('http')
const express = require('express');
const bodyParser = require('body-parser');
var cors= require('cors');
const socketio=require('socket.io');

const app = express();

const server=http.createServer(app);//creates aserver on your computer
const io=socketio(server);

const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./utill/database');
const User = require('./model/user');
const Message=require('./model/message');
const Group=require('./model/group');
const Usergroup=require('./model/usergroup');


app.use(cors());


const userRoutes=require('./routes/user');
const messageRoutes=require('./routes/message');
const groupRoutes=require('./routes/group');


app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/group',groupRoutes);

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);


User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});


app.use(express.static(path.join(__dirname,'public')));

sequelize.sync()
.then(()=>{
 app.listen(3000);

})
.catch(err=>{
    console.log(err)
})
/*
io.on('connection',socket=>{
    console.log('connected through socket io')
})
const PORT=3000||process.env.PORT;

server.listen(PORT,()=>
    console.log(`server running on ${PORT}`)
);*/
