const request = require( 'request')


const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=618d2692d0eae908f073219d70c110ef&query=' + latitude + ',' + longitude 

    request ({url, json : true}, (error, {body}) =>{
        if (error) {
            callback(' Unable to connect to the weather service.', undefined)
        } else if ( body.error) {
            callback ('Unable to find location', undefined)
        } else {
            callback (undefined, 'It is currently ' + body.current.temperature + ' degrees outside. It is ' + body.current.weather_descriptions[0] + " and there is a " + body.current.precip + " % chance of rain today. It feels like " + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast