const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Contact Schema
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  id_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Supplier Schema
const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['societe', 'contact'],
    required: true,
  },
  id_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    default: null, // No parent for individual contacts
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  }], // Array of references to Contact documents if the supplier is a company
  companyDetails: {
    industry: { type: String, required: false },
    registrationNumber: { type: String, required: false },
    website: { type: String, required: false },
  },
  contactDetails: {
    position: { type: String, required: false },
    department: { type: String, required: false },
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create models
const Contact = model('Contact', contactSchema);
const Supplier = model('Supplier', supplierSchema);

// Export models
module.exports = { Contact, Supplier };
