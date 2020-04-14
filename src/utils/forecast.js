const request = require('request')




const forecast = (long, lat, callback) =>{
    const url = '' + long + '' + lat //url of the api

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect ot server', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)
        }
        else {
            callback(undefined, "IT is currently" + body.currently.temprature + " degree out. There is a " + body.currently.precipProbability + "% chance of rain")        
        }
})
}

module.exports = forecast