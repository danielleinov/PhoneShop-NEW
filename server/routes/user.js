const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const catchAsync = require('../utils/catchAsync');
const {schemaUserRegister, schemaUserLogin} = require('../schemas');
const {validateRequest} = require('../middlewares/SchemaValidator');

router.route('/').get(catchAsync(user.getUsers))
router.route('/:id')
    .get(catchAsync(user.getUserById))
    .delete(catchAsync(user.deleteUserById))

router.post('/register', validateRequest(schemaUserRegister), catchAsync(user.register))
router.post('/login', validateRequest(schemaUserLogin), passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user)
    });

router.post("/logout", (req, res) => {
    req.logout();
    res.send({status: "ok"})
});
module.exports = router;