
const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '6NYOaiq8v9lYb4anGkNvmrRxSKejVfIlvJZjHkK__IQv2uAcn8xBp_6yW58coOfuUMwpp1Tjmmy3hUTjJ65DKOfuE8GF3qvwZPMDirzf88MWTPRbN2uNOI7hvb2fXHYx';

const searchRequest = {
  term:'park',
  //location: 'san francisco, ca',
  latitude: 47.6694956,
  longitude:-122.31547389999999
};

const client = yelp.client(apiKey);



client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
  console.log(response)
}).catch(e => {
  console.log(e);
});

