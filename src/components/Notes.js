import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
} from 'reactstrap'

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
    }
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = (e) => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop = (recordedBlob) => {
    // console.log('recordedBlob is: ', recordedBlob);
    this.props.setBlobs(recordedBlob.blobURL)
  }

  render(){
    return (<Container fluid={true}>
      <Row>
        <Col xl="0"></Col>
        <Col xl="12" className="notesPanel" >
          <Form className="p-4" id="initial-form">
            <h3>Record Your Thoughts</h3>
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              onData={this.onData}
              strokeColor="#000000"
              backgroundColor="#FFFFFF" />
            <br />
            <Button color="primary" onClick={this.startRecording}>Start</Button>
            <Button color="primary" onClick={this.stopRecording}>Stop</Button>
          </Form>
        </Col>
        <Col xl="0"></Col>
      </Row>
    </Container>
  )}
}

export default Notes
