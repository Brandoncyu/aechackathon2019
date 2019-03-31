var RAD2DEG = 180 / Math.PI
var DEG2RAD = Math.PI / 180
//const SunCalc = require('suncalc');

let lat = 47.6694956
//let long = -122.31547389999999
let long = 40
let rad = 100

class sunPos {
    constructor() { }

static CalcPos (){//calculate sun position at current time
var loc = SunCalc.getPosition(Date.now(), lat ,long )
console.log(loc);
var pt = this.polarToCartesian( loc.altitude, loc.azimuth, rad );
console.log(pt);
return([pt.x+200,pt.y,0]);
}

/**
 * Convert [lat,lon] polar coordinates to [x,y,z] cartesian coordinates
 * @param {Number} lon
 * @param {Number} lat
 * @param {Number} radius
 * @return {Vector3}
 */

static polarToCartesian( lon, lat, radius ) {

  var phi = ( 90 - lat ) * DEG2RAD
  var theta = ( lon + 180 ) * DEG2RAD

  return {
    x: -(radius * Math.sin(phi) * Math.sin(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.cos(theta),
  }

}
}
module.exports = sunPos;