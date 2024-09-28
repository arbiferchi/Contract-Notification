/*const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Contract = require('../models/contract');
const Reminder = require('../models/reminder');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const createSystemReminders = async () => {
    try {
        const contracts = await Contract.find();
        const reminders = [];

        for (const contract of contracts) {
            const dueDate = new Date(contract.dueDate);
            const twoMonthsBefore = new Date(dueDate);
            twoMonthsBefore.setMonth(dueDate.getMonth() - 2);
            const oneMonthBefore = new Date(dueDate);
            oneMonthBefore.setMonth(dueDate.getMonth() - 1);
            const twoWeeksBefore = new Date(dueDate);
            twoWeeksBefore.setDate(dueDate.getDate() - 14);

            reminders.push(
                { userId: contract.userId, contractId: contract._id, reminderDate: twoMonthsBefore, custom: false },
                { userId: contract.userId, contractId: contract._id, reminderDate: oneMonthBefore, custom: false },
                { userId: contract.userId, contractId: contract._id, reminderDate: twoWeeksBefore, custom: false }
            );
        }

        // Save reminders to the database
        await Reminder.insertMany(reminders);
        console.log('System reminders created successfully');
    } catch (error) {
        console.error('Error creating system reminders:', error);
    }
};

const sendReminderEmails = async () => {
    try {
        const emailDetails = [];

        // Find reminders that are due today
        const today = new Date().setHours(0, 0, 0, 0);
        const reminders = await Reminder.find({
            reminderDate: { $eq: today },
            emailSent: false
        }).populate('userId contractId');

        for (const reminder of reminders) {
            const { userId, contractId } = reminder;
            const user = userId;
            const contract = contractId;

            const mailOptions = {
                from: process.env.ETHEREAL_USER,
                to: user.email,
                subject: 'Contract Deadline Reminder',
                html: `
                    <p>Dear ${user.firstName},</p>
                    <p>This is a reminder that your contract "${contract.name}" is due on ${new Date(contract.dueDate).toDateString()}.</p>
                    <p>${contract.description}</p>
                    <p>Best regards,<br>Your App Team</p>
                `
            };

            await transporter.sendMail(mailOptions);

            reminder.emailSent = true;
            await reminder.save();

            emailDetails.push(mailOptions);
        }

        console.log('Reminder emails sent successfully');
        return emailDetails;
    } catch (error) {
        console.error('Error sending reminder emails:', error);
        return [];
    }
};

// Schedule the reminder job to run daily at 9 AM
cron.schedule('0 9 * * *', async () => {
    await createSystemReminders();
    await sendReminderEmails();
});

module.exports = { sendReminderEmails };*/
