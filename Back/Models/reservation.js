const mongoose = require('mongoose')

const reservationsSchema = mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: "Users" },
    buyer: { type: mongoose.Types.ObjectId, ref: "Users" },
    date: Date,
    created_at:Date,
    isDone:Boolean
})