import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap'

// const mapStyles = {
//   width: '80%',
//   height: '50vh',
//   marginLeft: 'auto',
//   marginRight: 'auto'
// };

export class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
        <Container fluid={true} >
          <Row noGutters={true}>
          <Col xl="0"></Col>
          <Col xl="12" >
            {/* <div style={{ height: '60vh', textAlign: "center"}} id="map"> */}
            <div style={{ height: '160vh', textAlign: "center"}} id="map">
              <h3 id="map-title">You are currently here</h3>
              <Map
                google={this.props.google}
                zoom={14}
                // style={mapStyles}
                initialCenter={{
                 lat: this.props.latitude,
                 lng: this.props.longitude
                }}>
                <Marker
                  onClick={this.onMarkerClick}
                  name={'Current Location'}
                />
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
              </Map>
            </div>
            </Col>
            <Col xl="0"></Col>
          </Row>
        </Container>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBiwsS0P3PVv4dr2sTs61i_9d-ICOsmSgw'
})(MapContainer);
