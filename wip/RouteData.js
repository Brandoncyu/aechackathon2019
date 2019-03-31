const turf = require('turf');
const turfrandom = require('@turf/random');
let createGraph = require('ngraph.graph');

const ColorParse = require('./ColorParse');

class RouteData {
  constructor() {}

  /**
   * Get a collection of random points which fall within a given bounding radius from an origin
   * lat/long point.
   * @param {String} lat Latitude of location.
   * @param {String} long Longitude of location.
   * @param {String} radius The radius of the bounding geometry from the given lat/long origin.
   * @param {String} numPoints How many points to return
   * @returns {Array} A collection of Turf.JS points.
   */
  static GetRandomPointGrid(lat, long, radius, numPoints) {
    let point = turf.point([lat, long]);
    let buffer = turf.buffer(point, radius);
    let bbox = turf.bbox(buffer);
    let points = turfrandom.randomPoint(numPoints, bbox);

    return points;
  }

  /**
   * Get a collection of points in a gird which fall within a given bounding radius from an origin
   * lat/long point.
   * @param {String} lat Latitude of location.
   * @param {String} long Longitude of location.
   * @param {String} radius The radius of the bounding geometry from the given lat/long origin.
   * @param {String} pointDist How far apart the points should be in the point grid.
   * @returns {Array} A collection of Turf.JS points.
   */
  static GetPointGrid(lat, long, radius, pointDist) {
    let point = turf.point([lat, long]);
    let buffer = turf.buffer(point, radius);
    let bbox = turf.bbox(buffer);
    var grid = turf.pointGrid(bbox, pointDist);

    return grid;
  }

  /**
   * Get graph object representing the points which are walkable given an origin lat/long, radius, and
   * distance between points for creation of a grid.
   * @param {String} lat Latitude of location.
   * @param {String} long Longitude of location.
   * @param {String} radius The radius of the bounding geometry from the given lat/long origin.
   * @param {String} pointDist How far apart the points should be in the point grid.
   * @param {String} linkTolerance The minimum distance between points to be considered a "link".
   * @returns {Graph} A ngraph.graph object.
   */
  static GetGraph(lat, long, radius, pointDist, linkTolerance) {
    let graph = createGraph();
    let grid = this.GetPointGrid(lat, long, radius, pointDist);

    // add all points as nodes
    grid.features.map(o1 => {
      let id = String(o1.geometry.coordinates[0]) + '-' + String(o1.geometry.coordinates[1]);
      graph.addNode(id, {
        x: o1.geometry.coordinates[0],
        y: o1.geometry.coordinates[1]
      });

      // iterate over the same collection to get links between nodes based on distance
      grid.features.map(o2 => {
        let id2 = String(o2.geometry.coordinates[0]) + '-' + String(o2.geometry.coordinates[1]);
        let distance = turf.distance(o1.geometry.coordinates, o2.geometry.coordinates);
        
        // if distance is within threshold, check nature metrics
        if (distance != 0 && distance < linkTolerance) {
          graph.addLink(id, id2);
          let a = o2.geometry.coordinates[0];
          let b = o2.geometry.coordinates[1];
          ColorParse.GetPaletteAnalysis(o2.geometry.coordinates[0], o2.geometry.coordinates[1]).then(result => {
            console.log(result);
          }).catch(err => console.error(err))
        }
      });
    });

    return graph;
  }

  static FindPath(graph) {
    let pathFinder = aStar(graph, {
      distance(fromNode, toNode) {

        let dx = fromNode.data.x - toNode.data.x;
        let dy = fromNode.data.y - toNode.data.y;

        return Math.sqrt(dx * dx + dy * dy);
      },
      heuristic(fromNode, toNode) {
        // this is where we "guess" distance between two nodes.
        // In this particular case our guess is the same as our distance
        // function:
        let dx = fromNode.data.x - toNode.data.x;
        let dy = fromNode.data.y - toNode.data.y;

        return Math.sqrt(dx * dx + dy * dy);
      }
    });
    let path = pathFinder.find('NYC', 'Washington');
  }

}

module.exports = RouteData;