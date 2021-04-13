const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const phone = require("./routes/phone");
const review = require("./routes/review")
const user = require("./routes/user");
const express = require("express");
const app = express();
const cors = require("cors");

require('custom-env').env(process.env.NODE_ENV, './config');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(process.env.CONNECTION_STRING, options)
    .then(() => console.log("Now connected to MongoDB!"))
    .catch((err) => console.error("Something went wrong", err));

app.use(express.json());
app.use(
    cors({
        origin: (_origin, callback) => {
            return callback(null, true);
        },
        credentials: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/phone", phone);
app.use("/api/review", review);
app.use("/api/user", user);
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    console.log(err.message);
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).send( {status: "error", error: err.message} )
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
