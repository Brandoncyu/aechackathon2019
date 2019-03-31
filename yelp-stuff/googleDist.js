const apiKey = 'AIzaSyBiwsS0P3PVv4dr2sTs61i_9d-ICOsmSgw';
const google = require('@google/maps');



class googleDist {
    constructor() { }
    

    static PointDist(lat1, long1,lat2,long2){
        from = new google.maps.LatLng({lat: -lat1, lng: long1});
        to = new google.maps.LatLng({lat: -lat2, lng: long2});
       // let from = {lat: lat1, lng: long1};
      //  let to = {lat: lat2, lng: long2};
        var dist = google.maps.geometry.spherical
        console.log(dist);
    }
}
module.exports = googleDist;