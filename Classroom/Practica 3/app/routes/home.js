const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send('e-commerce app practica 3');
    res.redirect('/home.html');
});

router.get('/home', (req, res) => {
    res.redirect('/home.html');
});

router.get('/shopping_cart', (req, res) => {
    res.redirect('/shopping_cart.html')
});

module.exports = router;