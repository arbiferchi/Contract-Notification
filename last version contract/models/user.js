const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
    },
    photo: {
        type: String,
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    verificationToken: { 
        type: String 
    },
    resetToken: {
        type: String 
    },
    resetTokenExpiry: {
        type: Date
    },
    status: { // New field to manage user status
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    }
    
},
{ collection: 'users' });

module.exports = user = model("user", userSchema);
