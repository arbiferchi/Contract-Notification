const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  contractId: { type: Schema.Types.ObjectId, ref: 'Contract',  default: null },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'email', 'sms', 'web-push'
  message: { type: String, required: true },
  sendAt: { type: Date, required: true },
  sent: { type: Boolean, default: false },
  status: { type: String,
    enum: ['pending', 'sent', 'failed'],
    
    default: 'pending' }, // e.g., 'pending', 'sent', 'failed'
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  priority: { 
    type: String,
    enum: ['low', 'medium', 'high'],

     default: 'medium' }, // e.g., 'high', 'medium', 'low'
  channel: { type: String, required: false }, // e.g., 'email', 'sms', 'web-push'
  retries: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 3 },
  error: { type: String, default: '' },
});

NotificationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Notification', NotificationSchema);
