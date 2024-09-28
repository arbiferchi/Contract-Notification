const cron = require('node-cron');
const Notification = require('../models/notification'); // Ensure correct path
const user = require("../models/user"); // Ensure correct path
const Contract = require('../models/contract'); // Ensure correct path
const sendMail = require('../middleware/mailer');
const { sendSms } = require('../middleware/sms'); // Import sendSms function
const pubnub = require('../middleware/pubnub'); // Ensure correct path to pubnet.js

const sendPubNubNotification = async (channel, message) => {
    try {
        await pubnub.publish({
            channel,
            message: {
                title: message.title,
                body: message.body,
            },
        });
        console.log(`PubNub notification sent to channel: ${channel}`);
    } catch (error) {
        console.error('Error sending PubNub notification:', error);
    }
};
const processNotifications = async () => {
    try {
        const now = new Date();
        // Fetch notifications with sendAt time less than or equal to now and that are not sent
        const notifications = await Notification.find({ sendAt: { $lte: now }, sent: false });

        // Process each notification
        for (const notification of notifications) {
            try {
                // Fetch user and contract data by ID
                const users = await user.findById(notification.userId);
                const contract = await Contract.findById(notification.contractId);

                // Debugging: log the retrieved user and contract
                console.log('Retrieved user:', users);
                console.log('Retrieved contract:', contract);

                if (!users || !contract) {
                    // If either user or contract is not found, handle the error
                    console.error(`User or contract not found for notification ID: ${notification._id}`);
                    continue;
                }

                if (notification.channel === 'email') {
                    // Prepare email text
                    const emailText = `Dear ${users.firstName},

${notification.message}

Contract: ${contract.title}`;

                   // Send email
                   await sendMail(users.email, notification.title, emailText);

                   // Log successful email sending
                   console.log(`Email sent to ${users.email} for notification ID: ${notification._id}`);

                   
               } /* else if (notification.channel === 'sms') {
                const text = `${notification.message} - Contract: ${contract.title}`;
                const to = "21690502362";
                console.log(`Sending SMS to ${to} with text: ${text}`);

                try {
                    const resp = await sendSms(to, text);
                    console.log('SMS response:', resp);
                } catch (err) {
                    console.error('Error sending SMS:', err.response?.data || err.message);
                    throw err;
                }

                console.log(`SMS sent to ${user.tel} for notification ID: ${notification._id}`);
            }
               */
            else if (notification.channel === 'webpush') {
                const pubnubMessage = {
                    title: notification.title,
                    body: `${notification.message}\n\nContract: ${contract.title}`,
                };
                await sendPubNubNotification(`user.${users._id}`, pubnubMessage);
                console.log(`Webpush notification sent to user ID: ${users._id} for notification ID: ${notification._id}`);
            }
               // Update notification status
               notification.sent = true;
               notification.status = 'sent';

               // Save updated notification
               await notification.save();
           } catch (error) {
               // Handle errors in notification processing
               notification.status = 'failed';
               notification.retries += 1;
               notification.error = error.message;

               if (notification.retries >= notification.maxRetries) {
                   notification.sent = true;
               }

               // Save updated notification
               await notification.save();

               // Log error
               console.error(`Failed to process notification ID: ${notification._id}`, error);
           }
       }
   } catch (error) {
       console.error('Error processing notifications:', error);
   }

};

// Schedule the cron job to run every minute
cron.schedule('* * * * *', processNotifications);

console.log('Notification cron job scheduled to run every minute');
