const express = require('express');
const router = express.Router();
const userAuthorization =require('../middleware/auth');
const messageController=require('../controllers/message');

router.post('/add-message',userAuthorization.authenticate,messageController.addMessage);
router.get('/get-message',userAuthorization.authenticate,messageController.getMessage)



module.exports=router;