const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  formData: { type: Object, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Form', formSchema);
