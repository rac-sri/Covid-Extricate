/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Stats from "../components/Stats";
import Graph from "../components/graph";
import Table from "../components/table";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
    };
  }
  componentDidMount() {}
  setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Stats />
          <Graph data={this.props.data} />

          <Table data={this.props.data} />

          <Row>
            <Col xs="12">
              {/* <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total Shipments</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                    <Col sm="6"></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1.data}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card> */}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
