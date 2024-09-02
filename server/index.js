// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const UserModel = require("./models/Users");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // mongoose.connect("mongodb://127.0.0.1:27017/mern_barcode");

// // app.post("/createUser", (req, res) => {
// //   UserModel.create(req.body)
// //     .then((users) => res.json(users))
// //     .catch((err) => res.json(err));
// // });

// // app.listen(3001, () => {
// //   console.log("Server is running");
// // });

// // server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const UserModel = require("./models/Users");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/mern_barcode");

// app.post("/createUser", (req, res) => {
//   const { name, email, product } = req.body;

//   const barcode = product;

//   UserModel.create({ name, email, product, barcode })
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.listen(3001, () => {
//   console.log("Server is running");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern_barcode", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
