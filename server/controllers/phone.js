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
        if (err) {
            res.send(err)
        } else {
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

module.exports.searchPhones = async (req, res) => {
    console.log(req.query)
    console.log(req.query.maxPrice === '')
    const name = req.query.name
    const maxPrice = parseInt(req.query.maxPrice === '' ? Number.MAX_SAFE_INTEGER : req.query.maxPrice)
    console.log(req.query.maxPrice === '')
    const manufacturer = req.query.manufacturer
    const phone = await Phone.find({
        'displayName': {
            $regex: `.*${name}.*`, "$options": "i"
        },
        'price': {
            $lt: maxPrice
        },
        'manufacturer': {
            $regex: `.*${manufacturer}.*`, "$options": "i"
        },
    });
    if (!phone) {
        return res.status(404).send('That phone Not found');
    }
    res.send(phone)
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

module.exports.updatePhoneById = async (req, res) => {
    const {id} = req.params;
    Phone.findOneAndUpdate({_id: id}, req.body, {upsert: true}, function (err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send(doc);
    });
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
        const name = $(this).find('a').find('strong').text();
        const manufacturer = name.split(" ")[0];
        const price = parseInt($(this).find('span').text().split(" ")[1].replace(/,/g, ''));  // Remove $ sign and comma from price
        const imageUrl = $(this).find('a').find('div').find('img').attr('data-src')

        const discount = Math.ceil(Math.random() * 10);  // Random number between 1 and 10

        const phone = new Phone({
            "displayName": name,
            "manufacturer": manufacturer,
            "price": price,
            "discount": discount,
            "imageUrl": imageUrl !== undefined ? imageUrl : ""
        });

        phone.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted successfully!");
        });
    });
    res.send();
}

