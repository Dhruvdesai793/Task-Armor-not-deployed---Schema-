const express = require('express');
const taskController = require('../controllers/taskController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

ruter.use(protect);

router.get('/stats',taskController.getStats); // Aggregation route

router.route('/').get(taskController.getAllTasks).post(taskController.createTask);


module.exports = router;