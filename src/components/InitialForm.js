import React from 'react'
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

const InitialForm = ({editState, editFeatures}) => {
  return (<Container fluid={true}>
    <Row>
      <Col xl="3"></Col>
      <Col>
        <Form className="p-4" id="initial-form">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Verify your email address" onChange={editState} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="time">Time</Label>
            <Input type="number" name="time" id="time" placeholder="How Much Time Do You Have Available?" onChange={editState} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="pace">Pace</Label><br />
            <Input type="select" name="pace" id="pace" onChange={editState}>
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="fast">Fast</option>
            </Input>
          </FormGroup>
          <FormGroup>
          <Label htmlFor="features">Features</Label>
            <Input type="select" name="features" id="features" onChange={editFeatures} multiple>
              <option value="nature">Nature</option>
              <option value="urban">Urban</option>
              <option value="shade">Shade</option>
            </Input>
          </FormGroup>
          <Button color="primary">Find Your Route!</Button>
        </Form>
      </Col>
      <Col xl="3"></Col>
    </Row>
  </Container>)
}

export default InitialForm
