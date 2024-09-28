const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const reminderSchema = new Schema ({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
  },
  contractId: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: true
  },
  reminderDate: {
        type:String,
      required: true,
      validate: {
        validator: function(v) {
          // Ensure the date string matches the desired format (e.g., YYYY-MM-DD)
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: props => `${props.value} is not in the correct format! the correct date format must be YYYY-MM-DD `
      }
  },
  emailSent: {
      type: Boolean,
      default: false
  },
  custom: {
   type: Boolean,
   default: false
}
 },
)

module.exports = reminder = model("reminder", reminderSchema)