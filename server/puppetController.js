require('dotenv').config()
const puppeteer = require('puppeteer')

let biography

const getBio = async (username,password) => {
  const browser = await puppeteer.launch({headless:false,slowMo:70});
  const page = await browser.newPage();

  const loginButton = '#root > div > div:nth-child(1) > header > div > div:nth-child(5) > button'
  const emailInput = 'body > div.jss74 > main > div > form > div:nth-child(1) > div > input'
  const passInput = 'body > div.jss74 > main > div > form > div:nth-child(2) > div > input'
  const submitLoginButton = 'body > div.jss74 > main > div > form > button:nth-child(3)'
  const accountButton = '#root > div > div:nth-child(1) > header > div > div.jss112'
  const accountBio = '#profilepaper > p:nth-child(4)'

  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('http://u-knight.ninja',{waitUntil: 'networkidle2'});
  await page.click(loginButton)

//wait for and input user email
  await page.waitForSelector(emailInput)
  await page.focus(emailInput)
  await page.keyboard.type(username)

//wait for and input user password
  await page.waitForSelector(passInput)
  await page.focus(passInput)
  await page.keyboard.type(password)

//submit login
  await page.click(submitLoginButton)

//navigation to account page
  await page.waitFor(2000)
  await page.waitForSelector(accountButton)
  await page.click(accountButton)

//wait for biography to load, assign it to a const and console log it
  await page.waitForSelector(accountBio)
    function waitForBio () {
        return document.querySelector('#profilepaper > p:nth-child(4)').innerHTML != ''
    }
  await page.waitFor(waitForBio)
    biography = await page.evaluate(()=>{
        return document.querySelector('#profilepaper > p:nth-child(4)').innerHTML
    })
  console.log(biography)

//   await page.waitFor(5000)
//   await page.screenshot({path: 'u-knight.png'});
  await browser.close();
  }; 


module.exports={
    login: async (req,res) => {
        const {username,password} =req.body
        try {
             console.log('hit')
            await getBio(username,password)
            res.status(200).send(biography)
        } catch (error) {
            console.log(error)
        }
       
    }     
}