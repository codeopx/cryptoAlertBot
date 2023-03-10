const fetch = require('node-fetch')

const jsdom = require('jsdom')

const twilio = require('twilio')

const api = new twilio('ACecb7cfe38e6ba51dcd39b88282133c7d','ac5f7801497b6e7f0d6f720c7cb7ca1a')


async function fetchHTML(url){
    try{
        
    const response = await fetch(url)



    const txt = await response.text()



    const page = new jsdom.JSDOM(txt)
    return page



    return page
    }
    catch(e){
        return false
    }
}


function getPrice(page){
    const obj = page.window.document.querySelector('.priceValue')
    let price = obj.textContent
    const priceAsNumber = Number(price.replace(/[^0-9.-]+/g,""))
    return priceAsNumber
}

function checkThreshold(price, threshold){
    if(price > threshold){
        // console.log(`The Price Is Over $${threshold}`)
        return true
    }
    else{
        //console.log(`The Price Is NOT Over $${threshold}`)
        return false
    }
}

  function sendMessage(cryptoName, price){
    let msg = `The Current Price of ${cryptoName} Is  $${price}`
    api.messages
  .create({
     body: msg,
     from: '+13087374567',
     to: '+2348119146594'
   })
  .then(message => console.log(message.sid));
  }

//create an array of crypto names
//const cryptoNameArray = ['bitcoin','ethereum','cardano','ripple']
const cryptoDictionary = {
    'bitcoin': 17000,
    'ethereum': 6000,
    'cardano': 1.5,
    'ripple': 1,
}

for(const cryptoName in cryptoDictionary){
    //create a template URL where we can switch in our crypto names
    let templateURL = `https://coinmarketcap.com/currencies/${cryptoName}/`


fetchHTML(templateURL).then((page) =>{
     const price = getPrice(page)
     console.log(`The Current Price of ${cryptoName} Is  $${price}`)
     if(checkThreshold(price, cryptoDictionary[cryptoName])){
        sendMessage(cryptoName, price)
     }
   })
}







