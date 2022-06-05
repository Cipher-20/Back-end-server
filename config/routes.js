const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const createController = require('../controllers/create');


module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(createController);
    
    app.all('*', (req,res) => {
        res.render('404')
    });
}