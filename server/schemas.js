const Joi = require('joi');

const schemaPhone = Joi.object({
    displayName: Joi.string().min(2).max(50).required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    description: Joi.string().min(5).required()
});

const schemaReview = Joi.object({
    phoneId: Joi.string().min(2).max(50).required(),
    content: Joi.string().min(3).max(50).required(),
    author: Joi.string().required()
});

// export the schemas
module.exports = {
    schemaPhone,
    schemaReview
};
