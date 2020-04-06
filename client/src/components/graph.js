import React from "react";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";

import chartData from "../variables/charData1.js";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GETLIST = gql`
  {
    rapidapi(input: "medicine") {
      country {
        country_name
        cases
        deaths
      }
    }
  }
`;
const Graph = () => {
  const data = useQuery(GETLIST);

  if (data.loading) return <p>Loading...</p>;
  if (data.error) return <p>ERROR</p>;
  var arr1 = [];
  var arr2 = [];
  data.data.rapidapi.country.forEach((value, index) => {
    arr1.push(value.country_name);
    const str = value.cases.replace(",", "");
    arr2.push(parseInt(str));
  });
  const ChartData = chartData(arr1.slice(0, 20), arr2.slice(0, 20));
  return (
    <Card className="card-chart">
      <CardHeader>
        <h5 className="card-category"></h5>
        <CardTitle tag="h3">
          <i className="tim-icons icon-delivery-fast text-primary" />
          World Statistics
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          <Bar data={ChartData.data} options={ChartData.options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default Graph;
