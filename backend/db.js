const mongoose = require('mongoose');
const { Schema, number } = require('zod');
//mongodb+srv://msoram7377:Oram1234md@cluster0.p1f46hy.mongodb.net/paytm_basic

mongoose.connect('mongodb+srv://msoram7377:Oram1234md@cluster0.p1f46hy.mongodb.net/paytm_basic')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    accountBalance: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});


const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model("User", userSchema)
module.exports = { User, Account }

