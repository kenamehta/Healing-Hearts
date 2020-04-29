import React, { Component } from "react";
import "../styles/jobs.css";
import api_route from "../app-config";
import { Redirect } from "react-router-dom";

import axios from "axios";
class FundraiserDesc extends Component {
  state = {
    modalShow: "none",
    selectedFile: null,
    jobId: "",
    applyerror: "",
    selectedjobId: "",
    resumeShow: ""
  };

  onResumeSubmit = e => {
    e.preventDefault();
    console.log(this.state.selectedjobId);

    const data = new FormData();
    console.log(this.state.selectedFile);
    data.append("myimage", this.state.selectedFile);

    let config = {
      headers: {
        Authorization: `${window.localStorage.getItem("student")}`
      }
    };

    console.log(data);

    axios
      .post(
        `${api_route.host}/student/upload/${this.state.selectedjobId}`,
        data,
        config
      )
      .then(res => {
        console.log(res);
        var path = `${api_route.host}//${res.data.resume}`;
        this.setState({ resumeShow: path });
        this.setState({ applyerror: "Successfully Applied" });
      })
      .catch(err => {
        this.setState({ applyerror: "Job Already Applied" });
        console.log(err);
      });
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    console.log("in redirecting");
    if (this.state.redirect) {
      localStorage.setItem("visitedcompany", this.state.id);
      return (
        <Redirect
          to={`/visitcompany/home/${localStorage.getItem("visitedcompany")}`}
        />
      );
    }
  };

  render() {
    console.log(this.props.jobdata);
    return (
      <div>
        {this.props.jobdata ? (
          <div>
            {this.renderRedirect()}
            <div className="d-flex">
              <div className=" pt-2 col-2">
                {this.props.jobdata.companyId ? this.props.jobdata.companyId
                  .profilePic ? (
                  <div>
                    <img
                      className="circular-avatar-image-medium avatar-image-medium"
                      src={`${api_route.host}//${this.props.jobdata.companyId
                        .profilePic}`}
                    />
                  </div>
                ) : (
                  ""
                ) : (
                  ""
                )}
              </div>
              <div className="p-2 b-1 ml-4">
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Suisse Int",
                    marginBottom: "5px"
                  }}
                >
                  {this.props.jobdata.title}
                </p>
                <div
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={e => {
                    this.setRedirect(this.props.jobdata.companyId._id);
                    this.setState({
                      id: this.props.jobdata.companyId._id
                    });
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      fontFamily: "Suisse Int",
                      color: "rgba(0,0,0,.56)"
                    }}
                  >
                    {this.props.jobdata ? this.props.jobdata.companyName : ""}
                  </p>
                </div>

                <div>
                  <p
                    style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                    className=""
                  >
                    {this.props.jobdata.category} Category
                  </p>
                </div>
              </div>
            </div>

            <div className="style__card___31yrn m-2">
              <div
                className="d-flex justify-content-between"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  alignSelf: "center"
                }}
              >
                <div>
                  {" "}
                  We wish to raise <span style={{fontWeight:"bold"}}>${this.props.jobdata.amount}</span>
                  
                </div>
                <button
                  id="myBtn"
                  className="btn btn-outline-success"
                  style={{ fontSize: "13px" }}
                  onClick={e => {
                    this.setState({ modalShow: "block" });
                  }}
                >
                  Raise
                </button>
                <div
                  id="myModal"
                  className="modal"
                  style={{ display: this.state.modalShow }}
                >
                  <div
                    className="modal-content col-5"
                    style={{ fontFamily: "Suisse" }}
                  >
                    <div className="container">
                      {this.state.applyerror ? (
                        <p style={{ color: "red" }}>{this.state.applyerror}</p>
                      ) : (
                        ""
                      )}
                      <span
                        class="close"
                        onClick={e => {
                          this.setState({ modalShow: "none" });
                          this.setState({ applyerror: "" });
                        }}
                      >
                        &times;
                      </span>
                      <p style={{ fontSize: "18px", fontWeight: "700" }}>
                        Apply to{" "}
                        {this.props.jobdata.company_basic_detail ? (
                          this.props.jobdata.company_basic_detail.company_name
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ fontSize: "15px", fontWeight: "500" }}>
                        Details from{" "}
                        {this.props.jobdata.company_basic_detail ? (
                          this.props.jobdata.company_basic_detail.company_name
                        ) : (
                          ""
                        )}
                        :
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: "200",
                          color: "rgba(0,0,0,0.8)"
                        }}
                      >
                        Applying for {this.props.jobdata.job_title} requires a
                        few documents. Attach them below and get one step closer
                        to your next job!
                      </p>
                      <h4> Attach your Resume!</h4>
                      <div>
                        <label
                          style={{ fontSize: "15px", fontWeight: "500" }}
                          for="img"
                        >
                          Your Resume:
                        </label>
                        <form
                          onSubmit={this.onResumeSubmit}
                          enctype="multipart/form-data"
                        >
                          <input
                            style={{ fontSize: "13px" }}
                            type="file"
                            name="file"
                            id="file"
                            onChange={event => {
                              console.log(event.target.files[0]);
                              this.setState({
                                selectedFile: event.target.files[0]
                              });
                            }}
                          />
                          {this.state.resumeShow ? (
                            <a
                              href={this.state.resumeShow}
                              target="_blank"
                              download="Resume"
                            >
                              Download
                            </a>
                          ) : (
                            ""
                          )}

                          <div>
                            <button
                              className="form-control mt-2 btn btn-outline-success"
                              onClick={e => {
                                this.setState({
                                  selectedjobId: this.props.jobdata._id
                                });
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="style__card___31yrn m-2">
              <h4 className="mb-3">Description about the job</h4>
              <p style={{ color: "dodgerblue" }}>
                {this.props.jobdata.job_description}
              </p>{" "}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FundraiserDesc;
