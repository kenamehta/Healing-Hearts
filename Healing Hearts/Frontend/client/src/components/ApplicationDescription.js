import React, { Component } from "react";
import "../styles/jobs.css";
import api_route from "../app-config";

import axios from "axios";
class ApplicationDescription extends Component {
  state = {
    modalShow: "none",
    selectedFile: null,
    jobId: "",
    applyerror: "",
  };

  render() {
    console.log(this.props.jobdata);
    return (
      <div>
        {this.props.jobdata ? (
          <div>
          <div className='d-flex p-2'>
          <div>
            <img
            className="circular-avatar-image-medium avatar-image-medium"
              style={{
                width: "120px",
              }}
              src={`${api_route.host}//${this.props.jobdata.companyId.profilePic}`}
            ></img>
            </div>
            <div className="p-2 ml-3 b-1">
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  fontFamily: "Suisse Int",
                  marginBottom: "5px",
                }}
              >
                 {this.props.jobdata
                  ? this.props.jobdata.fundraiserId.title
                  : ""}
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  fontFamily: "Suisse Int",
                  color: "rgba(0,0,0,.56)",
                }}
              >
              {this.props.jobdata
                  ? this.props.jobdata.fundraiserId.companyName
                  : ""}
               
              </p>
              <div className="d-flex mt-2">
              <div className="d-flex ">
                <ion-icon name="bookmark"></ion-icon>
                <p
                  style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                  className="ml-2"
                >
                  {this.props.jobdata
                    ? this.props.jobdata.fundraiserId.category
                    : ""}{" "}
                  Category,
                </p>
              </div>
              <div className="d-flex ml-2">
                <ion-icon name="cash-outline"></ion-icon>
                <p
                  style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                  className="ml-2"
                >
                  $ {this.props.jobdata ? this.props.jobdata.amount : ""},
                </p>
              </div>
              
            </div>
            </div>
            
            </div>
            

            <div className="style__card___31yrn m-2">
              <div
                className=""
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                <div className="col-9">
                  {" "}
                  <p style={{ fontSize: "15px" }}>
                  ${this.props.jobdata ? this.props.jobdata.amount : ""}
                    {" "}
                    funded on{" "}                    <i>
                      {this.props.jobdata
                        ? this.props.jobdata.createdAt.split("T")[0]
                        : ""}
                    </i>
                    {" "} for {this.props.jobdata
                  ? this.props.jobdata.fundraiserId.title
                  : ""} initiative
                  </p>
                </div>
                {/* <div  className='col-9'> <p style={{fontSize:"15px"}}>Status for the appliation is<i> {this.props.jobdata?this.props.jobdata.status:''}</i>! </p></div> */}
              </div>
            </div>

            <div className="style__card___31yrn m-2">
              <h4 className="mb-3">Description about the job</h4>
              <p style={{ color: "dodgerblue" }}>
                {this.props.jobdata.fundraiserId.description
                  ? this.props.jobdata.fundraiserId.description
                  : ""}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ApplicationDescription;
