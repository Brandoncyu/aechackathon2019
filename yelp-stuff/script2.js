const turf = require('turf')
const turfcircle = require('@turf/circle')
const turfrandom = require('@turf/random')
const SunCalc = require('suncalc');

//calculate sun position at current time
var loc = SunCalc.getPosition(Date.now(), 47.6694956, -122.31547389999999)
console.log(loc);


//calculate random points around current location
var center = [-75.343, 39.984];
var point = turf.point([-90.548630, 14.616599]);
var radius = 5;
var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
var buffer = turf.buffer(point, 2)
var bbox = turf.bbox(buffer);
var bboxPolygon = turf.bboxPolygon(bbox);
var points = turfrandom.randomPoint(25, bbox);

