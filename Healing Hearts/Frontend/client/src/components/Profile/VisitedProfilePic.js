import React, { Component } from "react";
import "../../styles/profilepic.css";

import { connect } from "react-redux";
import axios from "axios";
import api_route from "../../app-config";
import FormData from 'form-data'

class VisitedProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  

  render() {
    const show = this.state.saveflag ? "show" : "";
    const showbutton = this.state.saveflag ? "" : "show";
    const data = this.state.dataarr;
    console.log("sdfbdsfbbhjbhjhbfdjhbdsbfhjbjfd",this.state.dataarr);
    console.log(this.props.profileData);
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-offset-1 shadow_style">
            <div className="card">
              <div align="center" className="mt-2">
              {console.log("Picture here")}
              {this.props.profile?
              <img src={this.props.profile.profilePic} />:
              <form onSubmit={this.updatePic}>
              <div>
                <div className="style__edit-photo___B-_os">
                  <div>
                    <ion-icon
                      size="large"
                      name="camera"
                      style={{ color: "#1569e0" }}
                    ></ion-icon>
                  </div>
                 
                  <div>
                    {" "}
                    {/* <p style={{ color: "#1569e0", fontSize: "13px" }}>
                      Add Photo

                    </p> */}
                   
                    {/* <input style={{ color: "#1569e0", fontSize: "13px" }} type='file' name='file' onChange={e=>{
                      console.log(e.target.files[0])
              this.setState({picture:e.target.files[0]})
            }} ></input> */}
                   
                  </div>
                   
                </div>
                </div>

                {/* <input style={{ fontSize: "10px" }} type='submit' className='btn btn-primary mt-3' value='Edit Pic'></input> */}
                 
                </form>
                }
              </div>

              <div className="card-body " align="center">
                {true? (
                  
                  <div>
               
                    <h4
                      className="card-title"
                      style={{ fontSize: "24px", fontWeight: "500" }}
                    >
                      {this.props.profile ? this.props.profile.name : ""}
                    </h4>
                    {/* <h4
                      className="card-title"
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      {this.props.profile
                        ? this.props.profile.education[0].school_name
                        : ""}
                    </h4>
                    <h4
                      className="card-title"
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      {this.props.profile
                        ? this.props.profile.education[0].education_level
                        : ""}
                      ,
                      {this.props.profile
                        ? this.props.profile.education[0].major
                        : ""}
                    </h4> */}
                    {/* <h4
                      className="card-title"
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "rgba(0,0,0,.56)"
                      }}
                    >
                      {this.props.profile
                        ? this.props.profile.education[0].education_level
                        : ""}{" "}
                      • GPA:{" "}
                      {this.props.profile
                        ? this.props.profile.education[0].GPA
                        : ""}
                    </h4> */}

                    <div className={"collapse navbar-collapse " + showbutton}>
                      {/* <button
                        className="btn btn-primary"
                        onClick={e => {
                          this.setprops.profilelag: true });
                        }}
                      >
                        Edit info
                      </button> */}
                    </div>
                    <div className={"collapse navbar-collapse " + show}>
                      {/* <input
                        type="text"
                        placeholder={data?data.student.name:''}
                        onChange={e => {
                          this.setState({ temp: e.target.value });
                        }}
                      ></input>
                      <button
                        className="btn btn-primary"
                        onClick={e => {
                          this.handleEdit();
                        }}
                      >
                        Save
                      </button> */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    studentdata: state.profileReducer.educationarrs
    // authCompany: state.auth.authCompany
  };
};
export default VisitedProfilePic
