const ColorParse = require('./ColorParse');
const StreetData = require('./StreetData');


// ColorParse.GetPalette(46.414382, 10.013988, 151.78).then(colors => {
//   console.log(colors);
//   console.log(colors);
// });

// ColorParse.GetPaletteNames(46.414382, 10.013988).then(result => {
//   console.log(result);
//   console.log(result);
// })

// ColorParse.GetPaletteAnalysis(47.660259, -122.408417).then(result => {
//   console.log(result);
//   console.log(result);
// })

// StreetData.GetStreets('Seattle').then(x => console.log(x))
// StreetData.GetStreets2(3600237385,);

var query_overpass = require('./QueryOSM');

let cityName = 'Seattle';
query_overpass(`area["name"="${cityName}"];out body;`).then(x => console.log(x))


// query_overpass(`area["name"="${cityName}"];out body;`).then(res => {
//   console.log(res);
// }).catch(e => console.error(e));