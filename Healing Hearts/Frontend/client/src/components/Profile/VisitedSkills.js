import React, { Component } from "react";
import "../../styles/skills.css";
import api_route from "../../app-config";

import axios from "axios";

class VisitedSkills extends Component {
  state = {
    
  };

  
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-md-offset-1 shadow_style">
            <div className="card">
              <div className="m-3">
                <h2 style={{ fontSize: "20px", fontWeight: "500" }}>Skills</h2>
              </div>

              <div className="skills d-flex m-2 p-2">
                {this.props.skillData?this.props.skillData.skills.map(i => (
                  <div
                    className="style__tag___JUqHD"
                    style={{ flex: 1, flexWrap: "wrap", width: 0, flexGrow: 1 }}
                    key={i._id}
                  >
                    <div
                      className="d-flex"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "unset",
                        position: "relative",
                        flex: 1,
                        flexWrap: "wrap"
                      }}
                    >
                      <span>
                        {i.skill_name}
                        <span>
                          {/* <button
                            className="style__remove___2cUUS mt-1"
                            onClick={e => {
                              this.deleteSkill(i.skill_id);
                            }}
                          >
                            <ion-icon name="close"></ion-icon>
                          </button> */}
                        </span>
                      </span>
                    </div>
                  </div>
                )):''}
              </div>

              <div className="d-flex m-2">
                {/* <input
                  type="text"
                  placeholder="Add more skills..."
                  className="form-control"
                  onChange={e => {
                    this.setState({ skillname: e.target.value });
                  }}
                ></input> */}
                {/* <button
                  className="btn btn-success"
                  onClick={e => {
                    this.addSkill();
                  }}
                >
                  Add
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VisitedSkills;
