const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    furnishing: {
      type: String,
      required: true,
    },

    streetAddress: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    province: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    bedroomCount: {
      type: Number,
      required: true,
    },

    bathroomCount: {
      type: Number,
      required: true,
    },

    area: {
      type: Number,
      required: true,
    },

    occupancy: {
      type: Number,
      required: true,
    },

    amenities: {
      type: Array,
      default: [],
    },

    listingPhotoPaths: [{ type: String }],

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    rent: {
      type: Number,
      required: true,
    },

    deposit: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Rented"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema);