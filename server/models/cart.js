const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        phones: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Phone", required: true },
            quantity: { type: Number, required: true }
        }],
        totalQuantity: {
            type: Number
        },
        active: {
            type: Boolean,
            default: true
        },
        modifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

schema.statics.saveAndPopulate = function(doc) {
    return doc.save().then(doc => doc.populate('phones').execPopulate())
}
module.exports = mongoose.model("Cart", schema);