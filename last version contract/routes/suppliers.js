const express = require('express');
const router = express.Router();
const { Supplier, Contact } = require('../models/suppliers');
const authorizeRole = require("../middleware/authorizeRole");

// Add Supplier
router.post('', async (req, res) => {
  try {
    const { name, email, phone, address, type,contactDetails, companyDetails, contacts } = req.body;

    // Create supplier
    const newSupplier = new Supplier({
      name,
      email,
      phone,
      address,
      type,
      companyDetails: type === 'societe' ? companyDetails : null, // Include only if type is 'societe'
      contactDetails: type === 'contact' ? contactDetails : null, // Include only if type is 'contact'
    });

    // Save supplier to get its ID
    const savedSupplier = await newSupplier.save();

    // If the supplier is a company and has contacts
    if (type === 'societe' && contacts && contacts.length > 0) {
      const contactPromises = contacts.map(contact => {
        return new Contact({
          ...contact,
          id_parent: savedSupplier._id,
        }).save();
      });

      const savedContacts = await Promise.all(contactPromises);

      // Update supplier with the contacts
      savedSupplier.contacts = savedContacts.map(contact => contact._id);
      await savedSupplier.save();
    }

    res.status(201).json({ msg: "Supplier added successfully", supplier: savedSupplier });
  } catch (error) {
    res.status(400).json({ msg: "Error adding supplier", error });
  }
});
router.post('/contact/add', async (req, res) => {
  try {
    const { name, email, phone, address, position, department } = req.body;

    // Create a new contact without id_parent
    const contact = new Contact({
      name,
      email,
      phone,
      address,
      position,
      department
    });

    await contact.save();
    res.status(201).json({ msg: "Contact added successfully", contact });
  } catch (error) {
    res.status(400).json({ msg: "Error adding contact", error });
  }
});
// Add Contact (for existing supplier)
router.post('/contact/affect', async (req, res) => {
  try {
    const { name, email, phone, address, position, department, id_parent } = req.body;
    const contact = new Contact({
      name,
      email,
      phone,
      address,
      position,
      department,
      id_parent,
    });
    await contact.save();

    // Optionally, add the contact to the supplier
    await Supplier.findByIdAndUpdate(id_parent, { $push: { contacts: contact._id } });
    res.status(201).json({ msg: "Contact added successfully", contact });
  } catch (error) {
    res.status(400).json({ msg: "Error adding contact", error });
  }
});

// Delete supplier (soft delete)
router.delete('/:_id', authorizeRole("admin"), async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteSupplier = await Supplier.findById(_id);
    if (!deleteSupplier) {
      return res.status(404).send({ msg: "Supplier already deleted or does not exist" });
    }
    deleteSupplier.deletedAt = new Date();
    await deleteSupplier.save();
    res.status(200).send({ msg: "Supplier deleted successfully" });
  } catch (error) {
    res.status(400).send({ msg: "Cannot delete the supplier", error });
  }
});

// Delete specific contact from a company
router.delete('/contact/:id', authorizeRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).send({ msg: "Contact does not exist" });
    }

    // Remove the contact from the company's contacts array
    await Supplier.findByIdAndUpdate(contact.id_parent, { $pull: { contacts: id } });

    // Delete the contact
    await Contact.findByIdAndDelete(id);

    res.status(200).send({ msg: "Contact deleted successfully" });
  } catch (error) {
    res.status(400).send({ msg: "Cannot delete the contact", error });
  }
});

// Edit supplier
router.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedData = req.body;
    
    const data = await Supplier.findOneAndUpdate({ _id }, { $set: updatedData }, { new: true });
    res.status(200).send({ msg: "Supplier updated successfully", data });
  } catch (error) {
    res.status(400).send({ msg: "Cannot update the supplier", error });
  }
});

// Get all suppliers (excluding soft-deleted)
router.get('', async (req, res) => {
  try {
    const data = await Supplier.find({ deletedAt: null }).populate('id_parent').populate('contacts');
    res.status(200).send({ msg: "All suppliers", data });
  } catch (error) {
    res.status(400).send({ msg: "Cannot show suppliers", error });
  }
});

// Get supplier by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await Supplier.findOne({ _id: req.params.id, deletedAt: null }).populate('id_parent').populate('contacts');
    res.status(200).send({ msg: "Supplier details", data });
  } catch (error) {
    res.status(400).send({ msg: "Cannot get supplier", error });
  }
});

module.exports = router;

router.get('/contacts/:id',async(req,res)=>{
  try {
    const data = await Contact.findOne({ _id: req.params.id });
    res.status(200).send({ msg: "Contact details", data });
  } catch (error) {
    res.status(400).send({ msg: "Cannot get Contact", error });
  }
});
