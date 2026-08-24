require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const passport = require('passport');

require('./app_server/db/mongoose');
require('./app_api/config/passport');

const app = express();

// BODY PARSING (important for API routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VIEW ENGINE
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Partials
hbs.registerPartials(
    path.join(__dirname, 'app_server', 'views', 'partials')
);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

// ROUTES
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

// DEBUG (TEMP — remove later)
console.log('indexRouter type:', typeof indexRouter);
console.log('travelRouter type:', typeof travelRouter);
console.log('apiRouter type:', typeof apiRouter);

// ROUTE MOUNTING
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// SERVER
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});