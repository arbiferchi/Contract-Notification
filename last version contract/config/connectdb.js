
const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.BD_URI)
        console.log("DB connected")
    } catch (error) {
        console.log("cannot connect DB! \n",error)
    }
};

module.exports = connectDB;

