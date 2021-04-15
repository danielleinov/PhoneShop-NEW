const Joi = require('joi');

const schemaPhone = Joi.object({
    displayName: Joi.string().min(2).max(50).required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    manufacturer: Joi.string().min(3).required()
});

const schemaReview = Joi.object({
    phoneId: Joi.string().min(2).max(50).required(),
    content: Joi.string().min(3).max(50).required(),
    author: Joi.string().required()
});

const schemaUserRegister = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});

const schemaUserLogin = Joi.object({
    username: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});

// export the schemas
module.exports = {
    schemaPhone,
    schemaReview,
    schemaUserLogin,
    schemaUserRegister
};
