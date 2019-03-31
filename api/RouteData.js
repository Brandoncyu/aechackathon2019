const turf = require('turf');
const turfrandom = require('@turf/random');
let createGraph = require('ngraph.graph');
let path = require('ngraph.path');

const ColorParse = require('./ColorParse');
const YelpData = require('./YelpData');

class RouteData {
  constructor() {}

  /**
   * Get a collection of random points which fall within a given bounding radius from an origin
   * lat/long point.
   * @param {Number} lat Latitude of location.
   * @param {Number} long Longitude of location.
   * @param {Number} radius The radius of the bounding geometry from the given lat/long origin.
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
   * @param {Number} lat Latitude of location.
   * @param {Number} long Longitude of location.
   * @param {Number} radius The radius of the bounding geometry from the given lat/long origin.
   * @param {Number} pointDist How far apart the points should be in the point grid.
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
   * @param {Number} lat Latitude of location.
   * @param {Number} long Longitude of location.
   * @param {Number} radius The radius of the bounding geometry from the given lat/long origin.
   * @param {Number} pointDist How far apart the points should be in the point grid.
   * @param {String} linkTolerance The minimum distance between points to be considered a "link".
   * @returns {Graph} A ngraph.graph object.
   */
  static GetGraph(lat, long, radius, pointDist, linkTolerance) {
    let self = this;
    return new Promise(function (resolve, reject) {

      self.GetGraphData(lat, long, radius, pointDist, linkTolerance).then(r => {
        let graph = createGraph();
        r.map(o => {
          let idA = String(o.idA[0]) + '-' + String(o.idA[1]);
          let idB = String(o.idB[0]) + '-' + String(o.idB[1]);

          graph.addNode(idA, {
            x: +o.idA[0],
            y: +o.idA[1]
          });

          let dx = (+o.idA[0]) - (+o.idB[0])
          let dy = (+o.idA[1]) - (+o.idB[1]);

          graph.addLink(idA, idB, {
            greenScore: o.greenScore,
            parkScore: o.parkScore,
            dist: Math.sqrt(dx * dx + dy * dy),
            dist2: o.distance
          });
        });

        resolve(graph);

      }).catch(err => console.error(err));
    });
  }

  /**
   * Get graph data from the points which are walkable given an origin lat/long, radius, and
   * distance between points for creation of a grid.
   * @param {Number} lat Latitude of location.
   * @param {Number} long Longitude of location.
   * @param {Number} radius The radius of the bounding geometry from the given lat/long origin.
   * @param {Number} pointDist How far apart the points should be in the point grid.
   * @param {String} linkTolerance The minimum distance between points to be considered a "link".
   * @returns {Object} A ngraph.graph object.
   */
  static async GetGraphData(lat, long, radius, pointDist, linkTolerance) {
    let grid = this.GetPointGrid(lat, long, radius, pointDist);
    let promises = [];

    // add all points as nodes
    grid.features.map(o1 => {

      // iterate over the same collection to get links between nodes based on distance
      grid.features.map(o2 => {
        let distance = turf.distance(o1.geometry.coordinates, o2.geometry.coordinates);

        // console.log(distance);
        // if distance is within threshold, check nature metrics
        if (distance != 0 && distance < linkTolerance) {

          let temp = new Promise(function (resolve, reject) {
            ColorParse.GetPaletteAnalysis(o2.geometry.coordinates[0], o2.geometry.coordinates[1]).then(result => {

              // limiter.schedule(() => YelpData.ParkSearch(+o2.geometry.coordinates[0], +o2.geometry.coordinates[1], 500))
              YelpData.ParkSearch(47.660273, -122.409887, 500)
                .then(result2 => {
                  let returnObj = {
                    idA: o1.geometry.coordinates,
                    idB: o2.geometry.coordinates,
                    // greenScore: 1 - (+result),
                    greenScore: +result,
                    parkScore: result2.length,
                    distance: distance,
                  };
                  resolve(returnObj);
                }).catch(err => console.error(err));

            }).catch(err => console.error(err));
          });
          promises.push(temp);
        }
      });
    });

    return Promise.all(promises);
  }

  static FindPath(graph, idA, idB) {
    let pathFinder = path.aStar(graph, {
      distance(fromNode, toNode, link) {

        let dx = fromNode.data.x - toNode.data.x;
        let dy = fromNode.data.y - toNode.data.y;
        let distance =  Math.sqrt(dx * dx + dy * dy);

        let overallScore = 10 - (link.data.greenScore * 10) - link.data.parkScore;

        if (overallScore < 1) {
          return 1;
        } else {
          return overallScore
        }

      },
      heuristic(fromNode, toNode, link) {
        let overallScore = 10 - (link.data.greenScore * 10) - link.data.parkScore;

        if (overallScore < 1) {
          return 1;
        } else {
          return overallScore
        }
      }
    });
    return pathFinder.find(idA, idB);
  }

}

module.exports = RouteData;