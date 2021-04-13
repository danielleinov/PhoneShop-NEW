const Phone = require('../models/phone');
let axios = require('axios');
let cheerio = require('cheerio');

module.exports.addPhone = async (req, res) => {
    const phone = new Phone(req.body)
    await phone.save()
    res.send(phone)
}

module.exports.deletePhoneById = async (req, res) => {
    const {id} = req.params;
    Phone.findByIdAndDelete(id, (err, docs) => {
        if (err){
            res.send(err)
        }
        else{
            res.json({
                "status": "ok",
                "Deleted": docs
            });
        }
    });
}

module.exports.getPhones = async (req, res) => {
    const phones = await Phone.find().populate("reviews");
    res.send(phones)
}

module.exports.getPhoneById = async (req, res) => {
    const {id} = req.params;
    const phone = await Phone.findById(id).populate("reviews");
    if (!phone) {
        return res.status(404).json({
            "error": "Could not find phone with ID " + id
        });
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

module.exports.scrape = async (req, res) => {
    const page = await axios.get('https://www.mobile57.com/mobile-price-usd-709-to-usd-9999999.php')
    const $ = cheerio.load(page.data);
    $('div.brand-pro-index').each(function () {
        const row = $(this).text().split("\n");
        const name = row[4];
        const manufacturer = name.split(" ")[0];
        const price = parseInt(row[6].split(" ")[1].replace(/,/g, ''));  // Remove $ sign and comma from price
        const discount = Math.ceil(Math.random() * 10);  // Random number between 1 and 10

        const phone = new Phone({
            "displayName": name,
            "description": manufacturer,
            "price": price,
            "discount": discount
        });

        phone.save(function(err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted successfully!");
        });
    });
    res.send();
}

