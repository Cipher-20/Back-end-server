 const req = require('express/lib/request');
const { getAds, getAdsById } = require('../services/adsService');
const { adViewModel } = require('../util/mapper');

const router = require('express').Router();

router.get('/',  (req, res) => {
    // const houses = (await getHouses()).map(houseViewModel);
    res.render('home',);
});

router.get('/catalog', async (req, res) => {
    const ads = (await getAds()).map(adViewModel);
    res.render('catalog', { ads });
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    const ad = adViewModel(await getAdsById(id));

    // ad.remainingPieces = ad.pieces - ad.applied.length;
    ad.appliedList = ad.applied.map(r => r.email);

    if(req.session.user){
        ad.hasUser = true;
        if(req.session.user._id == ad.author._id){
            ad.isAuthor = true;
        }else{
            ad.isApplied = ad.applied.includes(req.session.user._id)
        }
    }


    res.render('details', { ad });
});
router.get('/search', (req,res) => {
    res.render('search')
});


module.exports = router;