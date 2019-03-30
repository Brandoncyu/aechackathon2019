var Vibrant = require('node-vibrant')

class ColorParse {
  constructor() {}

  static BuildRequest(lat, long){
    let base = 'https://maps.googleapis.com/maps/api/streetview?';
    let size = 'size=600x300&'
    let location = 'location=46.414382,10.013988&';
    let heading = 'heading=151.78&';
    let pitch = 'pitch=-0.76&'
    let key = 'key=AIzaSyBiwsS0P3PVv4dr2sTs61i_9d-ICOsmSgw';

    return base+size+location+heading+pitch+key;
  }

  static GetPalette() {
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = self.BuildRequest(46.414382, 10.013988);
      Vibrant.from(url).getPalette()
        .then(palette => {
          resolve(palette);
        }).catch(err => console.error(err));
    })
  }
}

module.exports = ColorParse;