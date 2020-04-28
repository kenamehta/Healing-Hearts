import React, { Component } from "react";
import Plot from "react-plotly.js";
class Fundraiser extends Component {
  state = {};
  render() {
    return (
      <div className="container pb-5">
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
                    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: [10, 9, 9, 7, 7, 3, 5, 4, 6, 7, 4],
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
    );
  }
}

export default Fundraiser;
