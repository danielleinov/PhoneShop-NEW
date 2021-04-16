const Phone = require('../controllers/phone');
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middlewares/SchemaValidator');
const catchAsync = require('../utils/catchAsync');
const {schemaPhone} = require('../schemas');



router.route('/')
    .post(validateRequest(schemaPhone), catchAsync(Phone.addPhone))
    .get(catchAsync(Phone.getPhones))
router.route('/scrape')
    .get(catchAsync(Phone.scrape))
router.route('/search')
    .get(catchAsync(Phone.searchPhones))
router.route('/:id')
    .get(catchAsync(Phone.getPhoneById))
    .patch(catchAsync(Phone.updatePhoneById))
    .delete(catchAsync(Phone.deletePhoneById))
router.route('/name/:name')
    .get(catchAsync(Phone.getPhoneByName))
module.exports = router;