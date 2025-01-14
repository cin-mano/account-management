const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    runningBalance: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Transaction = mongoose.model("Transaction",transactionSchema);
module.exports = Transaction