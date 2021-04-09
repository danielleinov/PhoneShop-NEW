const Phone = require('../controllers/phone');
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middlewares/SchemaValidator');
const catchAsync = require('../utils/catchAsync');
const {schemaPhone} = require('../schemas');



router.route('/')
    .post(validateRequest(schemaPhone), catchAsync(Phone.addPhone))
    .get(catchAsync(Phone.getPhones))
router.route('/:id')
    .get(catchAsync(Phone.getPhoneById))
router.route('/name/:name')
    .get(catchAsync(Phone.getPhoneByName))
module.exports = router;