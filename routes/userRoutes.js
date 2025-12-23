const express = require('express');
const userController = requrie('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(protect);

router.patch('/updatePassword',userController.updatePasword);
router.patch('/uploadAvatar',upload.single('avatar'),userController.uploadAvatar);


module.exports = router;