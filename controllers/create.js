const { isUser } = require('../middleware/guards');
const { createAds, getAdsById, updateAd, deleteAd, applyAd } = require('../services/adsService');
const { adViewModel, mapError } = require('../util/mapper');
// const { houseViewModel, mapError } = require('../util/mapper');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post('/create', isUser(), async (req, res) => {
    console.log(req.body);
    const userId = req.session.user._id;
    try {
        const adsPattern = {
            headline: req.body.headline,
            location: req.body.location,
            companyName: req.body.companyName,
            companyDescription: req.body.companyDescription,
            author: userId
        };

        await createAds(adsPattern);
        res.redirect('/catalog')
    } catch (err) {
        console.error(err.message);
        const errors = mapError(err);
        res.render('create', {
            data: {
                headline: req.body.headline,
                location: req.body.location,
                companyName: req.body.companyName,
                companyDescription: req.body.companyDescription
            }, errors
        });
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    const ad = adViewModel(await getAdsById(id));

    if (req.session.user._id != ad.author._id) {
        return res.redirect('/login');
    }
    res.render('edit', { ad });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription
    };

    try {
        await updateAd(id, ad);
        res.redirect('/details/' + id);

    } catch (err) {
        console.error(err.message);
        const errors = mapError(err);
        ad._id = id;
        res.render('edit', { errors, ad });
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    try {
        await deleteAd(id);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err.message);
        const errors = mapError(err);
        res.render('edit', { errors });
    }
});

router.get('/apply/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    try {
    const ad = adViewModel(await getAdsById(id));
    ad.remainingApplied = ad.applied.length;

     await applyAd(id, req.session.user._id);


    } catch (err) {
        console.error(err.message);
    }finally{
        res.redirect('/details/' + id);
    }
});



module.exports = router;