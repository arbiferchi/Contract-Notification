const express = require('express');
const router = express.Router();
const Notification = require('../models/notification'); // Ensure correct path
const notification = require('../models/notification');
const authorizeRole = require('../middleware/authorizeRole');
const isAuth = require('../middleware/isAuth');
const User = require('../models/user'); // Import the User model
const { NavItem } = require('react-bootstrap');

// Create a new notification
router.post('', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing notification
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a notification
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const { interval = 'day' } = req.query;

    // Define the grouping based on the requested interval (default to day)
    let groupByFormat;
    switch (interval) {
      case 'day':
        groupByFormat = { $dateToString: { format: '%Y-%m-%d', date: '$sendAt' } };
        break;
      case 'week':
        groupByFormat = { $dateToString: { format: '%Y-%U', date: '$sendAt' } }; // Week of the year
        break;
      case 'month':
        groupByFormat = { $dateToString: { format: '%Y-%m', date: '$sendAt' } };
        break;
      default:
        return res.status(400).json({ msg: 'Invalid interval. Use day, week, or month.' });
    }

    // Aggregation pipeline
    const stats = await Notification.aggregate([
      {
        $match: {
          sent: true // Only consider notifications that were successfully sent
        }
      },
      {
        $group: {
          _id: { 
            date: groupByFormat, 
            type: '$type' 
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1, '_id.type': 1 } // Sort by date and type
      }
    ]);

    res.json({ msg: 'Notification stats retrieved', data: stats });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to retrieve notification stats', error: error.message });
  }
});


router.get('', isAuth, async (req, res) => {
  try {
    let query = {};

    // If the user is not an admin, filter notifications by their UserID
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const data = await Notification.find(query)
      .populate('userId') // Adjust population as needed
      .lean();

    const transformedData = data.map(item => {
      const { userId, ...rest } = item;
      return {
        ...rest,
        user: userId,
      };
    });

    res.status(200).send({ msg: "All notifications", data: transformedData });
  } catch (error) {
    res.status(400).send({ msg: "Cannot show notifications", error: error.message });
  }
});

router.patch('/:id/contract', async (req, res) => {
    try {
      const { id } = req.params;
      const { contractId } = req.body;
  
      // Find and update the notification with the new contractId
      const notification = await Notification.findByIdAndUpdate(
        id,
        { contractId },
        { new: true, runValidators: true }
      );
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      res.json(notification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/find/:id',async(req,res)=>{
    try {
      const data = await Notification.findOne({ _id: req.params.id });
      res.status(200).send({ msg: "Notifcation details", data });
    } catch (error) {
      res.status(400).send({ msg: "Cannot get Notification", error });
    }
  });

module.exports = router;
