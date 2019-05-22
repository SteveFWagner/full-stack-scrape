const puppeteer = require('puppeteer')

module.exports={
    login: (req, res) => {
        console.log('hit')
        console.log(req.body)
    }
}