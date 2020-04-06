import React, { PureComponent } from "react";
import { Card, CardHeader, CardBody, CardTitle, Col, Table } from "reactstrap";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GETLIST = gql`
  {
    rapidapi(input: "medicine") {
      country {
        country_name
        cases
        deaths
        total_recovered
        new_deaths
        new_cases
        serious_critical
        active_cases
        total_cases_per_1m_population
      }
    }
  }
`;

const TableComp = (props) => {
  const data = useQuery(GETLIST);

  if (data.loading) return <p>Loading...</p>;
  if (data.error) return <p>ERROR</p>;

  const arr = data.data.rapidapi.country;
  return (
    <Card>
      <Col lg="12" md="12">
        <Card className="card-tasks">
          <CardHeader>
            <CardTitle tag="h4">Country Wise Statistics</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="table-full-width table-responsive">
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Country</th>
                    <th>Deaths</th>
                    <th>Total Recovered</th>
                    <th className="text-center">New Deaths</th>
                    <th className="text-center">New Cases</th>
                    <th className="text-center">Serious/Critical</th>
                    <th className="text-center">Active Cases</th>
                    <th className="text-center">
                      Total Cases per 1M population
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arr.map((value, index) => {
                    console.log(value.country_name);
                    return (
                      <tr>
                        <td>{value.country_name}</td>
                        <td>{value.cases}</td>
                        <td>{value.deaths}</td>
                        <td className="text-center">{value.total_recovered}</td>
                        <td className="text-center">{value.new_deaths}</td>
                        <td className="text-center">{value.new_cases}</td>
                        <td className="text-center">
                          {value.serious_critical}
                        </td>
                        <td className="text-center">{value.active_cases}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Card>
  );
};

export default TableComp;
