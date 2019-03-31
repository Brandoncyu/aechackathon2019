const turf = require('turf');
const turfrandom = require('@turf/random');

class RouteData {
  constructor() {}

  static GetRandomPointGrid(lat, long, radius, numPoints) {
    let point = turf.point([lat, long]);

    let buffer = turf.buffer(point, radius);
    let bbox = turf.bbox(buffer);
    let points = turfrandom.randomPoint(numPoints, bbox);

    return points;
  }

  static GetPointGrid(lat, long, radius, pointDist) {
    let point = turf.point([lat, long]);

    let buffer = turf.buffer(point, radius);
    let bbox = turf.bbox(buffer);

    var grid = turf.pointGrid(bbox, pointDist);

    return grid;
  }

}

module.exports = RouteData;