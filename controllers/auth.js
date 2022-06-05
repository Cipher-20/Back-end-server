const { isGuest, isUser } = require('../middleware/guards');
const { register, login } = require('../services/userService');
const { mapError } = require('../util/mapper');



const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post('/register',isGuest(), async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Passwords is required');
        }

        console.log(req.body.password.length);
        const passwordLength = req.body.password.length;
        if (passwordLength < 4) {
            throw new Error('Passwords should be at least 5 characters');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }

        const user = await register(req.body.email, req.body.descriptionSkils, req.body.password);
        req.session.user = user;
        res.redirect('/');

    } catch (err) {
        console.error(err.message);
        const errors = mapError(err);
        res.render('register', { data: { email: req.body.email, description: req.body.description, password: req.body.password }, errors });
    }
});

router.get('/login',isGuest(), (req, res) => {
    res.render('login');
});

router.post('/login', isGuest(), async (req, res) =>{

    // // if (req.body.password.trim() == '') {
    // //     throw new Error('Passwords is required');
    // // }
    // if (req.body.email.trim() == '') {
    //     throw new Error('Email is required');
    // }

    console.log(req.body.email, req.body.password);

    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;

        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        const errors = mapError(err);
        res.render('login', { data: { email: req.body.email }, errors });
    }
});

router.get('/logout',isUser(),(req, res) =>{
     delete req.session.user;
    res.redirect('/login');
})



module.exports = router;