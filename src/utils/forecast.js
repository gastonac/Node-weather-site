const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/e8c1ffc10180adf8dc44d6628f001d29/' + latitude + ',' + longitude + '?units=si'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find location. Try different coordinates.', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +
        ' degrees outside. The high today is ' + body.daily.data[0].temperatureHigh +
        ' with a low of ' + body.daily.data[0].temperatureLow + '.' +
        ' There is a ' + body.currently.precipProbability * 100 +
        '% chance of rain today. The summary for tomorrow: ' + body.daily.data[1].summary)
    }
  })
}

module.exports = forecast