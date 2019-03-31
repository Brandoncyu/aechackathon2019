const ColorParse = require('./ColorParse');
const StreetData = require('./StreetData');
const YelpData = require('./YelpData');
const WeatherData = require('./WeatherData');

YelpData.ParkSearch(47.6694956, -122.31547389999999).then(d => {
  console.log(d);
});

// let sunData = WeatherData.GetSunPositionToday(47.6694956, -122.31547389999999);
// console.log(sunData);

// ColorParse.GetPalette(46.414382, 10.013988, 151.78).then(colors => {
//   console.log(colors);
// });

// ColorParse.GetPaletteNames(46.414382, 10.013988).then(result => {
//   console.log(result);
// })

// ColorParse.GetPaletteAnalysis(47.660259, -122.408417).then(result => {
//   console.log(result);
// })