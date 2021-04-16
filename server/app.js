// Packages
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const socketIo = require('socket.io');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const http = require('http');

// Routes
const phone = require("./routes/phone");
const review = require("./routes/review")
const user = require("./routes/user");
const cart = require("./routes/cart");

require('custom-env').env(process.env.NODE_ENV, './config');

const app = express();

// Database connection
const mongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};
mongoose.connect(process.env.CONNECTION_STRING, mongooseOptions)
    .then(() => console.log("Now connected to MongoDB!"))
    .catch((err) => console.error("Something went wrong", err));

// Authentication
const UserModel = require('./models/user');
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
passport.use(new LocalStrategy(UserModel.authenticate()));

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use("/api/phone", phone);
app.use("/api/review", review);
app.use("/api/user", user);
app.use("/api/cart", cart);
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    console.log(err.message);
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).send({status: "error", error: err.message})
})

// Web Sockets
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origins: ["http://localhost:4200", "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: false
    }
});

var count = 0;
io.on('connection', (socket) => {
    setInterval(function(){
        socket.broadcast.emit('count', count);
    }, 1000);

    if (socket.handshake.headers.origin === "http://localhost:3000") {
        count++;
        socket.broadcast.emit('count', count);

        socket.on('disconnect', () => {
            count--;
            socket.broadcast.emit('count', count);
        });
    }
    else {
        socket.on('update', (newCount) => {
            count = newCount;
            socket.broadcast.emit('count', count);
        });
    }
});

// Start server
const port = process.env.PORT;
//app.listen(port, () => console.log(`Listening on port ${port}...`));
server.listen(port, () => console.log(`Listening on port ${port}...`));
