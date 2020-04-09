import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const Details = (props) => {
  return (
    <>
      <Col md="12">
        <Card>
          <CardHeader>
            <h5 className="title">Create A Camp</h5>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="px-md-4" md="3">
                  <FormGroup>
                    <label>Amount Needed</label>
                    <Input defaultValue="0" placeholder="Amount" type="text" />
                  </FormGroup>
                </Col>
                <Col className="pr-md-4" md="5">
                  <FormGroup>
                    <label>Name of the Individual or Institution</label>
                    <Input defaultValue="Name" placeholder="Name" type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Description</label>
                    <Input
                      cols="80"
                      defaultValue="Description"
                      placeholder="Here can be your description"
                      rows="4"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Col className="pl-md-4" md="4">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Links</label>
                  <Input placeholder="Links" />
                </FormGroup>
              </Col>
            </Form>
          </CardBody>
          <CardFooter>
            <Button className="btn-fill" color="primary" type="submit">
              Save
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </>
  );
};

export default Details;
