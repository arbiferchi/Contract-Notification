const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const docsSchema = new Schema({
  contractId: {
    type: Schema.Types.ObjectId,
    ref: 'contract',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  filePath: { // Change here: Store the path instead of data
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model('Doc', docsSchema); // Ensure the model name is 'Doc'
  