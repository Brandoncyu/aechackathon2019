const ColorParse = require('./ColorParse');
const StreetData = require('./StreetData');
const YelpParks = require('./YelpParks');
const WeatherData = require('./WeatherData');

// YelpParks.ParkSearch(47.6694956, -122.31547389999999).then(d => {
//   console.log(d);
//   console.log(d);
// });

let temp = WeatherData.GetSunPositionToday(47.6694956, -122.31547389999999);
console.log(temp);

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