const apiKey = '6NYOaiq8v9lYb4anGkNvmrRxSKejVfIlvJZjHkK__IQv2uAcn8xBp_6yW58coOfuUMwpp1Tjmmy3hUTjJ65DKOfuE8GF3qvwZPMDirzf88MWTPRbN2uNOI7hvb2fXHYx';
const yelp = require('yelp-fusion');

class YelpParks {
  constructor() {}

  static ParkSearch(lat, long) {
    const searchRequest = {
      term: 'park',
      latitude: lat,
      longitude: long
    };

    const client = yelp.client(apiKey);
    return new Promise(function (resolve, reject) {

      client.search(searchRequest).then(response => {
        let results = response.jsonBody.businesses

        let parkData = results.map(r => {
          return {
            name: r.name,
            rating: r.rating,
            coordinates: r.coordinates,
          }
        });
        resolve(parkData);
      }).catch(e => console.error(e));
    });
  }

}

module.exports = YelpParks;