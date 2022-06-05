const Ads = require('../models/Ads');

async function createAds(ads) {
    const result = new Ads(ads);
    await result.save();

    return result;
}

async function getAds() {
    return Ads.find({});
}

async function getAdsById(id) {
    return Ads.findById(id).populate('author');
}

async function updateAd(id, ad) {
    const existing = await getAdsById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName,
    existing.companyDescription = ad.companyDescription;

    await existing.save();
}

async function deleteAd(id) {
    return Ads.findByIdAndDelete(id);
}

async function applyAd(adId, userId){
    const ad = await Ads.findById(adId);

    if(ad.applied.includes(userId)){
        throw new Error('User is already applied');
    }

    ad.applied.push(userId);

    await ad.save(); 
}

module.exports = {
    createAds,
    getAds,
    getAdsById,
    updateAd,
    deleteAd,
    applyAd
}