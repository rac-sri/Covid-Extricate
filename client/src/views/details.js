import React, { useState, useContext } from "react";
import parent from "../ethereum/parent";
import web3 from "../ethereum/web3";

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
  const [value, update] = useState({
    Amount: 0,
    Name: "",
    Description: "",
    Links: "",
  });

  const onSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    const { Amount, Name, Description, Links } = value;
    const result = await parent.methods
      .CreateCamp(Amount, Name, Description, Links)
      .send({ from: accounts[0] });
    console.log(result);
  };

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
                    <Input
                      value={value.Amount}
                      placeholder="Amount"
                      type="number"
                      onChange={(e) =>
                        update({
                          Name: value.Name,
                          Description: value.Description,
                          Links: value.Links,
                          Amount: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col className="pr-md-4" md="5">
                  <FormGroup>
                    <label>Name of the Individual or Institution</label>
                    <Input
                      value={value.Name}
                      placeholder="Name"
                      type="text"
                      onChange={(e) =>
                        update({
                          Amount: value.Amount,
                          Description: value.Description,
                          Links: value.Links,
                          Name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Description</label>
                    <Input
                      cols="80"
                      placeholder="Here can be your description"
                      rows="4"
                      type="textarea"
                      value={value.Description}
                      onChange={(e) =>
                        update({
                          Amount: value.Amount,
                          Description: e.target.value,
                          Links: value.Links,
                          Name: value.Name,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Col className="pl-md-4" md="4">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Links</label>
                  <Input
                    placeholder="Links"
                    value={value.Links}
                    onChange={(e) =>
                      update({
                        Amount: value.Amount,
                        Description: value.Description,
                        Links: e.target.value,
                        Name: value.Name,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Form>
          </CardBody>
          <CardFooter>
            <Button
              className="btn-fill"
              color="primary"
              type="submit"
              onClick={onSubmit}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </>
  );
};

export default Details;
