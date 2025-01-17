import React, { Component } from "react";
import "../styles/skills.css";
import api_route from "../app-config";

import axios from "axios";

class Skills extends Component {
  state = {
    skillarr: [],
    skillname: ""
  };

  componentDidMount() {
    // let config = {
    //   headers: {
    //     Authorization: `${window.localStorage.getItem("student")}`
    //   }
    // };
    // console.log("mounting in education------------");
    // //this.setState({educationarr:this.props.educationData})
    // try {
    //   console.log("In try bloc");
    //   axios
    //     .get(`${api_route.host}/student/skills`, config)
    //     .then(res => {
    //       this.setState({ skillarr: res.data });
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  deleteSkill(skillId) {
    console.log(skillId + " in deleting");

    

    this.props.removeSkill(skillId);
    
  }

  addSkill() {

    this.props.addSkill(this.state.skillname)
    
  }

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
                    key={i.skill_id}
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
                          <button
                            className="style__remove___2cUUS mt-1"
                            onClick={e => {
                              this.deleteSkill(i._id);
                            }}
                          >
                            <ion-icon name="close"></ion-icon>
                          </button>
                        </span>
                      </span>
                    </div>
                  </div>
                )):''}
              </div>

              <div className="d-flex m-2">
                <input
                  type="text"
                  placeholder="Add more skills..."
                  className="form-control"
                  onChange={e => {
                    this.setState({ skillname: e.target.value });
                  }}
                ></input>
                <button
                  className="btn btn-success"
                  onClick={e => {
                    this.addSkill();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
