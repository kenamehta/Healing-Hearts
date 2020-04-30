import React, { Component } from "react";
import Plotly from "plotly.js-basic-dist";
import api_route from "./../app-config";
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
        .get(`${api_route.host}/company/trendingFundraisers`, config)
        .then(res => {
          let x = [],
            y = [];
          res.data.donations.map(don => {
            x.push(don.title);
            y.push(don.count);
          });
          this.setState({ x, y });
        });
  }

  render() {
    return <div className="container ">
    <div className="card jshadow">
      <div className="card-body">
        <h4 className="pb-3" style={{ fontWeight: "700" }}>
          Trending Fundraiser
        </h4>
        <hr />
        <div>
          <Plot
            data={[
              {
                x: this.state.x,
                y: this.state.y,
                type: "scattergl",
                marker: { color: "red" },
                name: "Trending fundraisers"
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
