const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contractSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  notificationId: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification'
  }],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    required: false,
  },
  montant: {
    type: Number,
    required: false,
  },
  startDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not in the correct format!`
    }
  },
  dueDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not in the correct format!`
    }
  },
  status: {
    type: String,
    enum: ['completed', 'en cours', 'blocker'],
    default: 'en cours'
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = model('Contract', contractSchema);
