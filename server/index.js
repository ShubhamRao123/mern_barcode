const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const TrackingModel = require("./models/Tracking");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern_barcode", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Tracking data

// app.get("/getTrackings", (req, res) => {
//   TrackingModel.find()
//     .then((trackings) => res.json(trackings))
//     .catch((err) => res.status(500).json(err));
// });

app.get("/getTrackings", (req, res) => {
  TrackingModel.find()
    .then((trackings) => res.json(trackings))
    .catch((err) => res.status(500).json(err));
});

// app.post("/createTracking", (req, res) => {
//   const { sender, receiver, shipment, trackingId } = req.body;

//   TrackingModel.create({ sender, receiver, shipment, trackingId })
//     .then((tracking) => res.json(tracking))
//     .catch((err) => res.status(500).json(err));
// });

app.post("/createTracking", (req, res) => {
  const { sender, receiver, shipment, trackingId, barcode } = req.body;

  TrackingModel.create({ sender, receiver, shipment, trackingId, barcode })
    .then((tracking) => res.json(tracking))
    .catch((err) => res.status(500).json(err));
});

app.put("/updateTracking", (req, res) => {
  const { id, sender, receiver, shipment, trackingId } = req.body;

  TrackingModel.findByIdAndUpdate(
    id,
    { sender, receiver, shipment, trackingId },
    { new: true }
  )
    .then((updatedTracking) => {
      if (!updatedTracking) {
        return res.status(404).json({ message: "Tracking not found" });
      }
      res.json(updatedTracking);
    })
    .catch((err) => res.status(500).json(err));
});

app.delete("/deleteTracking/:id", (req, res) => {
  const { id } = req.params;

  TrackingModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Tracking not found" });
      }
      res.json({ message: "Tracking deleted successfully" });
    })
    .catch((err) => res.status(500).json(err));
});

// user data
app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

app.post("/createUser", (req, res) => {
  const { name, email, product } = req.body;

  const barcode = product;

  UserModel.create({ name, email, product, barcode })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

app.put("/updateUser", (req, res) => {
  const { id, name, email, product } = req.body;

  const barcode = product;

  UserModel.findByIdAndUpdate(
    id,
    { name, email, product, barcode },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    })
    .catch((err) => res.status(500).json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
