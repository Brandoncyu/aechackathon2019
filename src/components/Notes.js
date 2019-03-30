import React from 'react'
import Recorder from 'react-mp3-recorder'
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

const Notes = () => {
  const onRecordingComplete = (blob) => {
    console.log('recording', blob)
  }

  const onRecordingError = (err) => {
    console.log('recording error', err)
  }

  return (<Container fluid={true}>
    <Row>
      <Col xl="3"></Col>
      <Col>
        <Form className="p-4" id="initial-form">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Verify your email address" />
          </FormGroup>
          <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
          <Button color="primary">Find Your Route!</Button>
          <br /><br />
          <Recorder
            onRecordingComplete={onRecordingComplete}
            onRecordingError={onRecordingError}
          />
        </Form>
        
      </Col>
      <Col xl="3"></Col>
    </Row>
  </Container>)
}

export default Notes
