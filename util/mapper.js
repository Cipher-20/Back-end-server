function mapError(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request Error' }];
    }
}

function adViewModel(ad) {
    return {
        _id: ad._id,
        headline: ad.headline,
        location: ad.location,
        companyName: ad.companyName,
        companyDescription: ad.companyDescription,
        author: authorViewModel(ad.author),
        applied: ad.applied.map(appliedViewModel)
    };
}

function authorViewModel(user) {
    return {
        _id: user._id,
        email: user.email,
        descriptionSkils: user.descriptionSkils
    }
}

    function appliedViewModel (applied) {
        return {
            _id: applied._id,
            email: applied.email,
            

        }
    }

module.exports = {
    mapError,
    adViewModel
};