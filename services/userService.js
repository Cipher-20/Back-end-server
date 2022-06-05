const User = require('../models/User');
const { hash, compare } = require('bcrypt');

async function register(email, descriptionSkils, password) {
    const existing = await getUserByUsername(email);

    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        descriptionSkils,
        hashedPassword
    });

    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByUsername(email);

    if (!user) {
        throw new Error('User doest\'n exist!');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect Password');
    }

    return user;
}

async function getUserByUsername(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    return user;
}

module.exports = {
    register,
    login
}
