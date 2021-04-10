
const Phone = require('../models/phone');
const Review = require('../models/review');

module.exports.addPhone = async (req, res) => {
    const phone = new Phone(req.body)
    await phone.save()
    res.send(phone)
}

module.exports.getPhones = async (req, res) => {
    const phones = await Phone.find().populate("reviews");
    res.send(phones)
}

module.exports.getPhoneById = async (req, res) => {
    const { id } = req.params;
    const phone = await Phone.findById(id).populate("reviews");
    if (!phone) {
        return res.status(404).send('That phone Not found');
    }
    res.send(phone)
}

module.exports.getPhoneByName = async (req, res) => {
    const phone = await Phone.find({
        'displayName': {
            $regex: `.*${req.params.name}.*`
        }
    }).populate("reviews");
    if (!phone) {
        return res.status(404).send('That phone Not found');
    }
    res.send(phone)
}
