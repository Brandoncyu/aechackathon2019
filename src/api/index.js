const ColorParse = require('./ColorParse');
const StreetData = require('./StreetData');
const YelpData = require('./YelpData');
const WeatherData = require('./WeatherData');
const RouteData = require('./RouteData');

module.exports = {
  /**
   * Field of view analysis for nature/greenery.
   * @property {module:ColorParse}
   */
  ColorParse,
  /**
   * Street-related data for analysis.
   * @property {module:StreetData}
   */
  StreetData,
  /**
   * Yelp-related data for analysis.
   * @property {module:YelpData}
   */
  YelpData,
   /**
   * Weather-related data for analysis.
   * @property {module:WeatherData}
   */
  WeatherData,
   /**
   * Route-related data for analysis.
   * @property {module:RouteData}
   */
  RouteData,
};
