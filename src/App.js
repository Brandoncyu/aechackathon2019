import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input
} from 'reactstrap'
import InitialForm from './components/InitialForm'
import Notes from './components/Notes'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      time: '',
      pace: 'slow',
      features: [],
      latitude: '',
      longitude: ''
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
        />
        <br></br>
        <Notes
          latitude = {this.state.latitude}
          longitude = {this.state.longitude}
          getMyLocation = {this.getMyLocation}
        />
      </div>
    );
  }
}

export default App;
