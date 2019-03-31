import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import InitialForm from './components/InitialForm'
import Notes from './components/Notes'
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap'

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
      distance: ''
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
      distance
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

  render() {
    return (
      <div>
        <h1 id ="title">Stroll</h1>
        <InitialForm
          editState = {this.editState}
          editFeatures = {this.editFeatures}
          email = {this.state.email}
          time = {this.state.time}
          pace = {this.state.pace}
          features = {this.state.features}
          submit = {this.submit}
        />
        <br></br>
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
              <Button size="lg" color="primary" block>Finish My Stroll!</Button>
            </Col>
            <Col xl="2"></Col>
          </Row>
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
