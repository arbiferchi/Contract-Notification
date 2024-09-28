
const express = require('express');
const router = express.Router();
const { sendReminderEmails } = require('../Reminder Cron/reminder');
const reminder = require('../models/reminder');



router.post('/send-reminders', async (req, res) => {
    try {
        const emailDetails = await sendReminderEmails();
        res.status(200).send({ msg: 'Reminder emails sent successfully.', emailDetails });
    } catch (error) {
        res.status(500).send({ msg: 'Failed to send reminder emails.', error });
    }
});

// Create a new reminder
router.post('', async (req, res) => {
    const { userId, contractId, reminderDate } = req.body;
    try {
        const data = new reminder({ userId, contractId, reminderDate, custom: true });
        await data.save();
        res.status(201).send({ msg: 'Reminder set successfully.', reminder : data });
    } catch (error) {
        res.status(500).send({ msg: 'Failed to set reminder.', error });
    }
});

// Update an existing reminder
router.put('/:_id', async (req, res) => {
    const { id } = req.params;
    const { reminderDate } = req.body;
    try {
        const reminder = await reminder.findByIdAndUpdate(id, { reminderDate }, { new: true });
        if (!reminder) {
            return res.status(404).send({ msg: 'Reminder not found.' });
        }
        res.status(200).send({ msg: 'Reminder updated successfully.', reminder });
    } catch (error) {
        res.status(500).send({ msg: 'Failed to update reminder.', error });
    }
});

// Delete a reminder
router.delete('/:_id', async (req, res) => {
    const { id } = req.params;
    try {
        const reminder = await reminder.findByIdAndDelete(id);
        if (!reminder) {
            return res.status(404).send({ msg: 'Reminder not found.' });
        }
        res.status(200).send({ msg: 'Reminder deleted successfully.' });
    } catch (error) {
        res.status(500).send({ msg: 'Failed to delete reminder.', error });
    }
});

// Get all reminders
router.get('', async (req, res) => {
    try {
        const reminders = await reminder.find().populate('userId contractId');
        res.status(200).send(reminders);
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch reminders.', error });
    }
});

module.exports = router;
