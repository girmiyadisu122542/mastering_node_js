const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: [true, 'The name of the tour is required']
  },
  duration: {
    type: Number,
    required: [true, 'A tour mus have duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour mus have maximum group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour mus have difficulty']
  },
  ratings: {
    type: Number,
    default: 4.5
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  desciption: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date],
  price: {
    type: Number,
    required: [true, 'A price of the tour is required']
  },
  priceDiscount: Number,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
