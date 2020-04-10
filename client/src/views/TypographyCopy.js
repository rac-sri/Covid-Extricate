import React, { Component } from "react";
import Typography from "./Typography";
import { InputGroup, Button, Input } from "reactstrap";
import gql from "graphql-tag";

const GETLIST = gql`
  {
    rapidapi(input: "medicine") {
      historyCountry(input: "usa") {
        country_name
        total_cases
        active_cases
        new_cases
        total_deaths
        new_deaths
        total_recovered
        total_cases_per1m
        record_date
      }
    }
  }
`;
class TypographyContainer extends Component {
  constructor() {
    super();
    this.state = { values: [], state: false };
  }

  onSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <>
        <div className="content">
          <InputGroup>
            <Input
              placeholder="username"
              value={this.state.input}
              onChange={(e) => {
                this.setState({ value: e.target.value });
              }}
            />
            <Button color="primary" onClick={this.onSubmit}>
              Submit
            </Button>
          </InputGroup>
          <br />
          {this.state.state && <Typography />}
        </div>
      </>
    );
  }
}

export default TypographyContainer;
