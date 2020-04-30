import React, { Component } from "react";
import Plotly from "plotly.js-basic-dist";
import api_route from "../../app-config";
import axios from "axios";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);
class VisitedAnalytics extends Component {
  state = {};

  componentDidMount()
  {
    let config = {
        headers: {
          Authorization: `${window.localStorage.getItem("student")}`
        }
      };
      axios
        .get(`${api_route.host}/company/analysis/categoryCount`, config)
        .then(res => {
          let x = [],
            y = [];
          res.data.don.map(don => {
              console.log(don)
            x.push(don._id);
            y.push(don.count);
          });
          this.setState({ x, y });
        });
  }

  render() {
    return <div className=" ">
    <div className="card jshadow">
      <div className="card-body">
        <h4 className="pb-3" style={{ fontWeight: "700" }}>
        Category wise Donation
        </h4>
        <hr />
        <div>
          <Plot
            data={[
              {
                labels: this.state.x,
                values: this.state.y,
                type: "pie",
                marker: { color: "red" },
                name: "Category wise Donation"
              }
            ]}
          />
        </div>
      </div>
    </div>
  </div>
  }
}

export default VisitedAnalytics;
