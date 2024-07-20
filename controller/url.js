const Url = require('../model/url');
const shortid = require('shortid');

async function generateShortUrl(req, res) {
    console.log("New Post request Received");
    const shortId = shortid();
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url Required" });
    await Url.create({
        shortID: shortId,
        redirectUrl: body.url,
        visitedHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home",{
        id: shortId,
    });
}


async function generateanalytics(req,res){
    const shortId = req.params.shortid;
    const result = await Url.findOne({shortId});
    return res.json({totalClicks: result.visitedHistory.length, analytics:result.visitedHistory});
}
module.exports = {
    generateShortUrl,
    generateanalytics,
};
