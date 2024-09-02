const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
  sender: {
    name: String,
    email: String,
    product: String,
    address: String,
  },
  receiver: {
    name: String,
    email: String,
    product: String,
    address: String,
  },
  shipment: {
    shipmentName: String,
    address: String,
  },
  trackingId: String,
  barcode: String,
});

const TrackingModel = mongoose.model("trackings", TrackingSchema);
module.exports = TrackingModel;
