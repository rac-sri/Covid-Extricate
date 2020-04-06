import React, { Component } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import { isRegularExpressionLiteral } from "typescript";
import { Col, Card, CardBody, Table } from "reactstrap";

const GETLIST = gql`
  {
    rapidapi(input: "world") {
      world {
        total_cases
        total_deaths
        total_recovered
        new_cases
        new_deaths
        statistic_taken_at
      }
    }
  }
`;

const World = () => (
  <Query query={GETLIST}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error ${error.message}`;
      const {
        total_recovered,
        total_deaths,
        total_cases,
        new_deaths,
        new_cases,
        statistic_taken_at,
      } = data.rapidapi.world;

      return (
        <Col md="12">
          <Card>
            <CardBody>
              <Table hover>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Total Cases</td>
                    <td>{total_cases}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Total Deaths</td>
                    <td>{total_deaths}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Total Recovered</td>
                    <td>{total_recovered}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>New Cases (since :{statistic_taken_at})</td>
                    <td>{new_cases}</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>New Death (since :{statistic_taken_at})</td>
                    <td>{new_deaths}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      );
    }}
  </Query>
);

export default World;
