const express = require('express');
const Contract = require('../models/contract'); // Correct import
const { Supplier, Contact } = require('../models/suppliers'); // Ensure the path is correct
const authorizeRole = require('../middleware/authorizeRole');
const isAuth = require('../middleware/isAuth');
const router = express.Router();
const Notification = require('../models/notification'); // Ensure correct path


// ADD contract 
router.post('', async (req, res) => {
  try {
    const { userId, supplierId, title, description, shortDescription, tag, montant, startDate, dueDate, status, notifications } = req.body;

    // Fetch the supplier and populate contacts
    const supplier = await Supplier.findById(supplierId).populate('contacts').exec();
    if (!supplier) {
      return res.status(404).send({ msg: "Supplier not found" });
    }

    // Create a new contract
    const contract = new Contract({
      userId,
      supplierId,
      contacts: supplier.contacts, // Add contacts to the contract
      title,
      description,
      shortDescription,
      tag,
      montant,
      startDate,
      dueDate,
      status
    });

    // Save the contract to get the contract ID
    const savedContract = await contract.save();

    // Create notifications with the contract ID and save them
    const notificationIds = await Promise.all(notifications.map(async (notification) => {
      const newNotification = new Notification({
        ...notification,
        contractId: savedContract._id // Assign the contract ID to each notification
      });
      const savedNotification = await newNotification.save();
      return savedNotification._id;
    }));

    // Update the contract with the notification IDs
    savedContract.notificationId = notificationIds;
    await savedContract.save();

    res.status(200).send({ msg: "Contract is added successfully", contract: savedContract });
  } catch (error) {
    res.status(400).send({ msg: "Uploading contract failed", error: error.message });
  }
});
router.get('/monthly-contracts-trend', isAuth, async (req, res) => {
  try {
    const monthlyContracts = await Contract.aggregate([
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$createdAt" } },
            month: { $month: { $toDate: "$createdAt" } }
          },
          initiated: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    const result = monthlyContracts.map(item => ({
      year: item._id.year,
      month: item._id.month,
      initiated: item.initiated,
      completed: item.completed
    }));

    res.status(200).send({ msg: "Monthly contracts trend", data: result });
  } catch (error) {
    res.status(500).send({ msg: "Failed to fetch monthly contracts trend", error: error.message });
  }
});

// Get Contracts by Supplier
router.get('/contracts-by-supplier', isAuth, async (req, res) => {
  try {
    const contractsBySupplier = await Contract.aggregate([
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplier'
        }
      },
      {
        $unwind: '$supplier'
      },
      {
        $group: {
          _id: '$supplier._id',
          supplierName: { $first: '$supplier.name' }, // Change 'name' to your actual supplier name field
          numberOfContracts: { $sum: 1 }
        }
      },
      {
        $sort: {
          numberOfContracts: -1
        }
      }
    ]);

    res.status(200).send({ msg: "Contracts by Supplier", data: contractsBySupplier });
  } catch (error) {
    res.status(500).send({ msg: "Failed to fetch contracts by supplier", error: error.message });
  }
});

// GET all contracts
router.get('', isAuth, async (req, res) => {
  try {
    let query = {};

    // If the user is not an admin, filter by their ID
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const data = await Contract.find(query)
      .populate('userId')
      .populate('supplierId')
      .populate('contacts')
      .lean();

    const transformedData = data.map(item => {
      const { userId, supplierId, contacts, docId, ...rest } = item;
      return {
        ...rest,
        user: userId,
        supplier: supplierId,
        contacts: contacts,
        doc: docId,
      };
    });

    res.status(200).send({ msg: "All contracts", data: transformedData });
  } catch (error) {
    res.status(400).send({ msg: "Cannot show contracts", error });
  }
});

// Get Contract by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await Contract.findById(req.params.id)
      .populate('userId')
      .populate('supplierId')
      .populate('contacts')
      .exec();
    res.status(200).send({ msg: "The contract is", data });
  } catch (error) {
    res.status(400).send({ msg: "Cannot get contract", error });
  }
});

// Delete contract
router.delete('/:_id', authorizeRole("admin"), async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteContract = await Contract.findById(_id);
    if (!deleteContract) {
      return res.status(404).send({ msg: "Contract already deleted or does not exist" });
    }
    await Contract.findOneAndDelete({ _id });
    res.status(200).send({ msg: "Contract has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: "Contract cannot be deleted" });
  }
});

// Update Contract
router.put('/:_id', isAuth, async (req, res) => {
  try {
    const { _id } = req.params;

    // Find the contract to ensure it exists and belongs to the user
    const existingContract = await Contract.findById(_id);

    if (!existingContract) {
      return res.status(404).send({ msg: "Contract not found" });
    }

    // Check if the user is authorized to update the contract
    if (existingContract.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send({ msg: "You are not authorized to update this contract" });
    }

    // Update the contract
    const result = await Contract.updateOne({ _id }, { $set: { ...req.body } });

    res.status(200).send({ msg: "Contract's data is updated" });
  } catch (error) {
    res.status(400).send({ msg: "Cannot update the contract's data", error });
  }
});

// Monthly Contracts Trend Route - Should be placed before the dynamic ID route




module.exports = router;
