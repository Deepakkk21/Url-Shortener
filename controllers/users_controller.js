const URL = require("../modals/URL");
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid/non-secure');
const { Sequelize, DataTypes, Op } = require('sequelize');


module.exports.Homepage = function(req,res){
          return res.render("Homepage")
}

//  shortening the Url 

module.exports.urlshortener= async function (req, res) {
    const originalUrl = req.body.Url;
    
    try {
        const existingUrl = await URL.findOne({where: { originalUrl: { [Op.iLike]: originalUrl }}});
        if (existingUrl) {
            console.log("already existes");
            return res.redirect('/user/homepage');
        }
        const shortUrl = nanoid.nanoid(7);
        
        const newUrl = new URL({
            originalUrl,
            shortUrl,
        });

        console.log(newUrl);
        await newUrl.save();
        return res.redirect('/user/homepage');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
  

// ReDirect to Original


module.exports.redirectOriginal = async function(req , res){
    const shortUrl = req.params.shortUrl;
    console.log("shortUrl:" ,shortUrl);
    try {
        const url = await URL.findOne({where: { shortUrl: { [Op.iLike]: shortUrl }}});

        if (!url) {
            return res.status(404).send('Short URL not found');
        }

        url.clicks++;
        await url.save();
        // Redirect to the original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

// Display the Data


module.exports.getdata = async function (req, res){
    try {
        const urls = await URL.findAll({});

        res.json({ urls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};