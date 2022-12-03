'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/userRoute');
const tagRoutes = require('./routes/tagRoute');
const articleRoutes = require('./routes/articleRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes.routes);
app.use('/tags', tagRoutes.routes);
app.use('/articles', articleRoutes.routes);

app.listen(config.port, () => console.log("App is listening on " + config.url));