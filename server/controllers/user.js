const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    const { email, name, password } = req.body;
    const user = new User({ email, name });
    const registeredUser = await User.register(user, password);
    res.send(registeredUser);
}

module.exports.deleteUserById = async (req, res) => {
    const {id} = req.params;
    User.findByIdAndDelete(id, (err, docs) => {
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

module.exports.getUsers = async (req, res) => {
    const users = await User.find()
    res.send(users)
}

module.exports.getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({
            "error": "Could not find user with ID " + id
        });
    }
    res.send(user)
}