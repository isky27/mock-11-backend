const mongoose = require("mongoose");

require("dotenv").config();

const connection = async () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGO_DATABASE_URL)
        .then(() => console.log("Mongo Connected"))
        .catch((e) => console.log(e))
}

module.exports = connection