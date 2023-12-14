const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const taskRouter = require ("./routes/taskRouter");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", taskRouter);

module.exports = app;