import React from "react";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";

import chartData from "../variables/charData1.js";

const Graph = (props) => {
  var arr1 = [];
  var arr2 = [];
  let recorddata = "";
  props.data.forEach((value, index) => {
    const date = value.record_date.substr(0, 10);
    if (date != recorddata) {
      arr1.push(date);
      const str = value.total_cases.replace(",", "");
      arr2.push(parseInt(str));
      recorddata = date;
    }
  });
  const ChartData = chartData(
    arr1.slice(0, 20).reverse(),
    arr2.slice(0, 20).reverse()
  );
  return (
    <Card className="card-chart">
      <CardHeader>
        <h5 className="card-category"></h5>
        <CardTitle tag="h3">
          <i className="tim-icons icon-delivery-fast text-primary" />
          Total Cases (Graphical Representation)
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          <Line data={ChartData.data} options={ChartData.options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default Graph;
