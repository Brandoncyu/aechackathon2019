var Vibrant = require('node-vibrant')

class ColorParse {
  constructor() {}

  static BuildRequest(){
    
  }

  static GetPalette() {
    return new Promise(function (resolve, reject) {
      Vibrant.from('https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBiwsS0P3PVv4dr2sTs61i_9d-ICOsmSgw').getPalette()
        .then(palette => {
          resolve(palette);
        }).catch(err => console.error(err));
    })
  }
}

module.exports = ColorParse;