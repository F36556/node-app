const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url ='https://api.darksky.net/forecast/8105eeed5a44c7f587ae28185872e341/'+latitude+','+longitude + '?units=si'
    request({url, json:true},(error,{ body })=>{
        if(error){
            callback('unable to connect with weather-app ,maybe internet is off',undefined)
        } else if(body.error){
            callback('try anothor location',undefined)
        }   
        else{
            callback(undefined, body.currently.summary  +  '  it is currrently '+ body.currently.temperature +' degree out .there is a '+body.currently.precipProbability + ' %of chance of rain')
        }
    })
}


module.exports = forecast
