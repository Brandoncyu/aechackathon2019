import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import InitialForm from './components/InitialForm'
import MapContainer from './components/MapContainer'
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
      distance: '',
      signin: true
    }
    this.getMyLocation = this.getMyLocation.bind(this)
  }

  componentDidMount() {
    this.getMyLocation();
  }

  SendEmail(){
    // const express = require('express');
    // const bodyParser = require('body-parser');
    // const exphbs = require('express-handlebars');
    // const path = require('path');
    const nodemailer = require('nodemailer');

    // const app = express();

    var userEmail;

    const axios = require('axios')

    axios.post('/send', () => {
      userEmail = "jchernick2010@gmail.com";
      // NotesAsString = req.body.message;
      var NotesAsString = "TimeStamp = Tuesday@10:42pm \n Latitude: 123123424 \n Longitude: 23423424 \n Blob: Voice Recording"; // dummy data 

      const output = `
          <h3>Stroll Notes</h3>
          <p>${NotesAsString}</p>
      `;

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // let account = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: "StrollAppEmail@gmail.com", // generated ethereal user
              pass: "Shot51222!" // generated ethereal password
          },
          tls:{
              rejectUnauthorized: false
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Stroll" <StrollAppEmail@gmail.com>', // sender address
          // to: "jchernick2010@gmail.com",
          to: userEmail, // list of receivers .. Send to userEmail
          subject: "Saved Stroll", // Subject line
          text: "Hello world?", // plain text body
          html: output // html body
      };

      // send mail with defined transport object
      // let info = await transporter.sendMail(mailOptions)
      transporter.sendMail(mailOptions, (error, info) => {
          if(error){
              return console.log(error);
          }

          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          // res.render('contact', {msg: 'Email has been sent'});
          // res.render('index', {msg: 'Email has been sent'});
          console.log("Email Has been sent...");
      });
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    });
  }
    // app.post('/send', () => {

    //     userEmail = "jchernick2010@gmail.com";
    //     // NotesAsString = req.body.message;
    //     var NotesAsString = "TimeStamp = Tuesday@10:42pm \n Latitude: 123123424 \n Longitude: 23423424 \n Blob: Voice Recording"; // dummy data 

    //     const output = `
    //         <h3>Stroll Notes</h3>
    //         <p>${NotesAsString}</p>
    //     `;

    //     // Generate test SMTP service account from ethereal.email
    //     // Only needed if you don't have a real mail account for testing
    //     // let account = await nodemailer.createTestAccount();

    //     // create reusable transporter object using the default SMTP transport
    //     let transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: "StrollAppEmail@gmail.com", // generated ethereal user
    //             pass: "Shot51222!" // generated ethereal password
    //         },
    //         tls:{
    //             rejectUnauthorized: false
    //         }
    //     });

    //     // setup email data with unicode symbols
    //     let mailOptions = {
    //         from: '"Stroll" <StrollAppEmail@gmail.com>', // sender address
    //         // to: "jchernick2010@gmail.com",
    //         to: userEmail, // list of receivers .. Send to userEmail
    //         subject: "Saved Stroll", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: output // html body
    //     };

    //     // send mail with defined transport object
    //     // let info = await transporter.sendMail(mailOptions)
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if(error){
    //             return console.log(error);
    //         }

    //         console.log("Message sent: %s", info.messageId);
    //         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    //         // res.render('contact', {msg: 'Email has been sent'});
    //         // res.render('index', {msg: 'Email has been sent'});
    //         console.log("Email Has been sent...");
    //     });
    // });

  //   app.listen(3000, () => console.log("server started..."))
  // }
  

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

  render() {
    return (
      <div>
        <span><h1 id ="title">Stroll</h1></span>
        {/* <span><h5>go take a walk</h5></span> */}
        
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

        <br /><br />
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
              <Button size="lg" color="primary" block onClick={()=>this.setState({signin: true})}>Finish My Stroll!</Button>
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
