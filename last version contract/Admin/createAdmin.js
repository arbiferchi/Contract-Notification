const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = require('../models/user'); 
require('dotenv').config(); 

const createInitialAdmin = async () => {
    try {
        const email = "admin@gmail.com";
        const password = "adminpassword123";
        const role = "admin";
        
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        
        const newAdmin = new user({
            firstName: "Super",
            lastName: "Admin",
            email,
            password: hashPassword,
            role,
            tel: "1234567890",
        });
        
        await newAdmin.save();
        console.log("Initial admin created");
    } catch (error) {
        console.error("Error creating initial admin:", error);
    } finally {
        mongoose.disconnect();
    }
};

mongoose.connect(process.env.BD_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        return createInitialAdmin();
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });
