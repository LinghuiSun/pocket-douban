import fetchJsonp from 'fetch-jsonp'
function fetchData(url, callback) {
  fetchJsonp(url)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      callback(json)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

export default fetchData