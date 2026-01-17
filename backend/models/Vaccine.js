const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
  vaccine: {
    type: String,
    required: true,
    index: true
  },
  region: {
    type: String,
    required: true,
    index: true
  },
  year: {
    type: Number,
    required: true,
    index: true
  },
  marketSize: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dosesDistributed: {
    type: Number,
    required: true
  },
  efficacy: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Indexes for better query performance
vaccineSchema.index({ region: 1, year: 1 });
vaccineSchema.index({ brand: 1, vaccine: 1 });

module.exports = mongoose.model('Vaccine', vaccineSchema);
