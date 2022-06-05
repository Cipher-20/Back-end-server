const { Schema, model, Types: { ObjectId } } = require('mongoose');


const emailPattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String, required: true,
        validate: {
            validator(value) {
                return emailPattern.test(value);
            },
            message: 'Email may contain only english letters    '
        }
    },
    descriptionSkils: {
        type: String, max: [40, 'Description must to be max 40 characters long'],
        required: true
    },
    hashedPassword: {
        type: String
    },
    myAds: { type: [ObjectId], ref: 'Ad', default: [] }
});

const User = model('User', userSchema);

module.exports = User;