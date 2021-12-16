const mongoose = require('mongoose')

const model = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

model.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = new mongoose.model("User", model)