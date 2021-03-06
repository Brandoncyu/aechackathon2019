import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import InitialForm from './components/InitialForm'
import MapContainer from './components/MapContainer'
import Notes from './components/Notes'
import axios from 'axios'
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap'

// const ColorParse = require('./api/ColorParse');
// const StreetData = require('./api/StreetData');
// import WeatherData from './api/WeatherData6'
// const WeatherData = require('./api/WeatherData');
// const RouteData = require('./api/RouteData');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      time: '',
      pace: 0,
      features: [],
      latitude: '',
      longitude: '',
      blobs: [],
      distance: '',
      signin: true
    }
    this.getMyLocation = this.getMyLocation.bind(this)
  }

  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  editState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  editFeatures = (e) => {
    let newFeatures = []
    for (let i = 0, len = e.target.options.length; i < len; i++) {
        let opt = e.target.options[i];
        if (opt.selected) {
            newFeatures.push(opt.value);
        }
    }
    this.setState({
      features: newFeatures
    })
  }

  submit = (e) => {
    e.preventDefault()
    let distance = (Number(this.state.time) * Number(this.state.pace))/120
    this.setState({
      distance,
      signin: false
    })
  }

  setBlobs = (blobURL) => {
    this.getMyLocation()
    let date = new Date()
    let latitude = this.state.latitude
    let longitude = this.state.longitude
    let newBlob = {date, blobURL, latitude, longitude}
    let blobs = [ ...this.state.blobs, newBlob ]
    this.setState({
      blobs
    })
  }

  finishStroll = async () =>{
    this.setState({signin: true})
    console.log(this.state.blobs)
    await axios.post('http://localhost:4000/send', {email: this.state.email, text: this.state.blobs})
  }

  render() {

    return (
      <div>
        <h1 id ="title">Stroll</h1>
        {this.state.signin && <InitialForm
          editState = {this.editState}
          editFeatures = {this.editFeatures}
          email = {this.state.email}
          time = {this.state.time}
          pace = {this.state.pace}
          features = {this.state.features}
          submit = {this.submit}
        />}
        <br />
        {!this.state.signin && <div>
        <MapContainer
          latitude = {this.state.latitude}
          longitude = {this.state.longitude}
        />

        <br />
        <Notes
          latitude = {this.state.latitude}
          longitude = {this.state.longitude}
          setBlobs = {this.setBlobs}
        />

        <br />
         <Container>
          <Row>
            <Col xl="2"></Col>
            <Col style={{display: 'flex', justifyContent: 'center'}} >
              <Button className="finishButton" size="md" color="primary" block onClick={this.finishStroll}>Finish My Stroll!</Button>
            </Col>
            <Col xl="2"></Col>
          </Row>
        </Container>
        </div>}
        <br />
        <br />
      </div>
    );
  }
}

export default App;
