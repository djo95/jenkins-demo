const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
  
  marque: { type: String },
  modele: String,
  puissanceF: String,
  carburant: { type: String },
  annee: { type: Number },
  kilometrage: Number,
  title: { type: String },
  description: { type: String },
  prix: { type: Number },
  phone: { type: Number },
  image: { type: [String] },
  valid: Boolean,
  created_at: Date,
  owner: { type: mongoose.Types.ObjectId, ref: "Users" },
});
module.exports = mongoose.model("cars", carsSchema);
