const apiKey = '6NYOaiq8v9lYb4anGkNvmrRxSKejVfIlvJZjHkK__IQv2uAcn8xBp_6yW58coOfuUMwpp1Tjmmy3hUTjJ65DKOfuE8GF3qvwZPMDirzf88MWTPRbN2uNOI7hvb2fXHYx';
const yelp = require('yelp-fusion');

class YelpParks {
  constructor() { }

  static BuildRequest() {

  }

  static ParkSearch(lat, long) {
    const searchRequest = {
      term: 'park',
      latitude: lat,
      longitude: long
    };
    this.SendYelp(searchRequest)
  }


  static SendYelp(searchRequest) {
    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
     let results = response.jsonBody.businesses

     let parkData = results.map(r => {
      return {
        name: r.name,
        rating: r.rating,
        coordinates: r.coordinates
      }
     });

      const prettyJson = JSON.stringify(parkData, null, 4);
      console.log(prettyJson);
      // console.log(response)
    }).catch(e => {
      console.log(e);
    });
  }




}

module.exports = YelpParks;