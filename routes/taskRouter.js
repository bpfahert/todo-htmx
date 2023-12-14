const express = require('express');
const router = express.Router();

const task_controller = require("../controllers/taskController");

router.get('/', task_controller.index);

router.get('/create', task_controller.task_create_get);

router.post('/create', task_controller.task_create_post);

router.post('/complete/:id', task_controller.task_complete_post);

router.delete('/delete/:id', task_controller.task_delete);

router.get('/edit/:id', task_controller.task_edit_get);

router.put('/edit/:id', task_controller.task_edit_put);

module.exports = router;