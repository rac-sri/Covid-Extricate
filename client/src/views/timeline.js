import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import Graph from "../components/graphLine";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GETLIST = gql`
  query apiaccess($inputString: String) {
    rapidapi {
      historyCountry(input: $inputString) {
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
const Timeline = (props) => {
  const query = useQuery(GETLIST, {
    variables: { inputString: props.country },
  });
  if (query.loading) return <div className="content">Loading...</div>;
  let data = "";
  if (query.data.rapidapi.historyCountry) {
    var array = query.data.rapidapi.historyCountry
      .reverse()
      .filter((element) => {
        if (element.record_date.substr(0, 10) !== data) {
          data = element.record_date.substr(0, 10);
          return element;
        }
      });
  } else array = [];
  return (
    <>
      <div className="content">
        <Graph data={array} />
        <Row>
          <Col md="12">
            <Card className="card-tasks">
              <CardHeader>
                <CardTitle tag="h4">Timeline</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        {/* <th>Name</th> */}
                        <th>Total Cases</th>
                        <th>Active Cases</th>
                        <th>New Cases</th>
                        <th>Total Deaths</th>
                        <th>New Deaths</th>
                        <th>Total Recovered</th>
                        <th>Cases Per 1M</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {array.map((value, element) => {
                        return (
                          <tr>
                            {/* <th>{value.country_name}</th> */}
                            <th>{value.total_cases}</th>
                            <th>{value.active_cases}</th>
                            <th>{value.new_cases}</th>
                            <th>{value.total_deaths}</th>
                            <th>{value.new_deaths}</th>
                            <th>{value.total_recovered}</th>
                            <th>{value.total_cases_per1m}</th>
                            <th>{value.record_date}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Timeline;
