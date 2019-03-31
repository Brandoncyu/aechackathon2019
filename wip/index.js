const ColorParse = require('./ColorParse');
const StreetData = require('./StreetData');
const YelpData = require('./YelpData');
const WeatherData = require('./WeatherData');
const RouteData = require('./RouteData');


// YelpData.ParkSearch(47.6694956, -122.31547389999999).then(d => {
//   console.log(d);
// });

// let points = RouteData.GetRandomPointGrid(-90.548630, 14.616599, 1, 10);
// console.log(points);

// let points = RouteData.GetPointGrid(-90.548630, 14.616599, 1, 0.1);
// console.log(points);

// RouteData.GetGraphData(47.660273, -122.409887, 1, 0.5, 0.6).then(x => {
//   console.log(x);
//   console.log(x);
// });

let graph = RouteData.GetGraph(47.660273, -122.409887, 1, 0.5, 0.6);

console.log(graph);


// RouteData.GetGraph(47.660273, -122.409887, 1, 0.5, 0.6).then(result => {
//   console.log(result);
// })

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