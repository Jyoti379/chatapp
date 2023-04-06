const express = require('express');
const router = express.Router();
const userAuthorization =require('../middleware/auth');
const groupController=require('../controllers/group');

router.post('/addUser',groupController.addUser);
router.post('/postgroup',groupController.postGroup);
router.post('/add-group',userAuthorization.authenticate,groupController.addgroup)
router.get('/getgroup',groupController.getGroup);
router.get('/get-groupmessage',groupController.getGroupMessage);
router.post('/logoutuser',groupController.logoutuser)
router.post('/groupAdmin',groupController.groupAdmin)


module.exports= router;