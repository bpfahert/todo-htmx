const { v4: uuidv4 } = require('uuid');

const tasks = [];

exports.index = (req, res, next) => {
    res.render("index", {title: "Bryan's tasks", tasks: tasks});
}

exports.task_create_get = (req, res, next) => {
    res.send(
        `<form id="newtaskform">
        <div class="row justify-content-center">
            <div class="form-group col-lg-12 mb-3">
                <div class="form-floating">
                    <input type="text" id="Task name" class="form-control" name="name" required maxLength={12}></input>
                    <label for="name" class="form-label">Task name</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-lg-12 mb-3">
                <div class="form-floating">
                    <textarea id="description" class="form-control" name="description" maxLength={800}></textarea>
                    <label for="description">Description</label>
                </div>
            </div>
        </div>
        <button hx-post="/create" hx-trigger="click" hx-target="#newtaskform" hx-swap="outerHTML" class="btn btn-info" > Create task</button>
    </form>`
    )
}

exports.task_create_post = (req, res, next) => {
    const task = {
        name: req.body.name,
        description: req.body.description,
        completed: false,
        id: uuidv4(),
    };
    tasks.push(task);
    res.send(        
        `<div class="card" hx-target="this" hx-swap="outerHTML" id=${task.id}>
            <h3 class="card-title">${task.name}</h3>
            <p class="card-text">${task.description}</p>
            <p class="card-text" id="taskstatus">Status: ${task.completed}</p>
            <button class="btn" hx-post='/complete/${task.id}' hx-target="#taskstatus" hx-swap="outerHTML">Complete</button>
            <button class="btn btn-primary" hx-get='/edit/${task.id}' hx-target="closest div">Edit Task</button>
            <button class="btn btn-info" hx-delete='/delete/${task.id}' hx-target="closest div" hx-swap="delete">Delete</button>
        </div>`
        );
}

exports.task_edit_get = (req, res, next) => {
    const taskID = req.params.id;
    const index = tasks.map(task => task.id).indexOf(taskID);
    res.send(
        `<form id="newtaskform" hx-put='/edit/${tasks[index].id}' hx-target="this" hx-swap="outerHTML">
        <div class="row justify-content-center">
            <div class="form-group col-lg-12 mb-3">
                <div class="form-floating">
                    <input type="text" id="Task name" class="form-control" name="name" required maxLength={12} value='${tasks[index].name}'></input>
                    <label for="name" class="form-label">Task name</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-lg-12 mb-3">
                <div class="form-floating">
                    <textarea id="description" class="form-control" name="description" maxLength={800}>${tasks[index].description}</textarea>
                    <label for="description">Description</label>
                </div>
            </div>
        </div>
        <button class="btn">Submit</button>
        <button class="btn" hx-get='/edit/${tasks[index].id}'>Cancel</button>
    </form>
        `
    )
}

exports.task_edit_put = (req, res, next) => {
    const task = {
        name: req.body.name,
        description: req.body.description,
        completed: false,
        id: req.params.id,
    };
    const taskID = req.params.id;
    const index = tasks.map(task => task.id).indexOf(taskID);
    tasks[index] = task;
    
    res.send(
        `<div class="card" hx-target="this" hx-swap="outerHTML" id=${task.id}>
        <h3 class="card-title">${task.name}</h3>
        <p class="card-text">${task.description}</p>
        <p class="card-text" id="taskstatus"></p>
        <button class="btn" hx-post='/complete/${task.id}' hx-target="#taskstatus" hx-swap="outerHTML">Complete</button>
        <button class="btn btn-primary" hx-get='/edit/${task.id}' hx-target="closest div">Edit Task</button>
        <button class="btn btn-info" hx-delete='/delete/${task.id}' hx-target="closest div" hx-swap="delete">Delete</button>
        </div>`
        );
}

exports.task_delete = (req, res, next) => {
    const taskID = req.params.id;
    const index = tasks.map(task => task.id).indexOf(taskID);
    tasks.splice(index, 1);
    res.send();
}


exports.task_complete_post = (req, res, next) => {
    const taskID = req.params.id;
    const index = tasks.map(task => task.id).indexOf(taskID);    
    tasks[index].completed = !tasks[index].completed;
    res.send(
        `<p class="card-text" id="taskstatus">Status: ${tasks[index].completed}</p>
        `
    );
}