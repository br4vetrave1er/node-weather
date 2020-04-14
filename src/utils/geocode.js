const request = require('request')

const geocode = (address, callback) => {
    url = '' + encodeURIComponent(address) + ''

    request({url, json: true},(error, response)=>{
        if (error) {
            callback('Unable to connect ot server', undefined)
        } else if (response.body.feature.length === 0) {
            callback('Unable to find Location', undefined)
        }
        else {
            const {latitude = center[0], longitude = center[1], place = place_name} = response.body.feature[0]
            callback(place, latitude, longitude)        
        }
        
    }
    )
}

module.exports = geocode