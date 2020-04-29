import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import axios from "axios";
import api_route from "../app-config";
import "../styles/jobs.css";
import { getStudents } from "../redux/actions/studentListAction";
import Pagination from "react-js-pagination";

class DonorList extends Component {
  state = {
    studentarr: [],
    perStudentArr: [],
    redirect: false,
    id: "",
    studentnameFilter: "empty",
    majorFilter: "empty",
    skillFilter: "empty",
    collegeFilter: "empty",
    page: "1",
    limit: "10",
    count: "",
  };
  componentWillReceiveProps(nextProps) {
     console.log(nextProps.list.donors.docs);
    this.setState({ studentarr: nextProps.list.donors.docs }, () => {
      console.log(this.state.studentarr);
    });
    this.setState({ perStudentArr: nextProps.list.donors.docs });
    this.setState({ count: nextProps.list.donors.total });
  }
  getFilterList = () => {
    this.props.getStudents({
      studentnameFilter: this.state.studentnameFilter,
      majorFilter: this.state.majorFilter,
      skillFilter: this.state.skillFilter,
      collegeFilter: this.state.collegeFilter,
      page: this.state.page,
      limit: this.state.limit,
    });
  };
  componentWillMount() {
    this.props.getStudents({
      studentnameFilter: this.state.studentnameFilter,
      majorFilter: this.state.majorFilter,
      skillFilter: this.state.skillFilter,
      collegeFilter: this.state.collegeFilter,
      page: this.state.page,
      limit: this.state.limit,
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState(
      { page: pageNumber },
      this.props.getStudents({
        studentnameFilter: this.state.studentnameFilter,
        majorFilter: this.state.majorFilter,
        skillFilter: this.state.skillFilter,
        collegeFilter: this.state.collegeFilter,
        page: pageNumber,
        limit: this.state.limit,
      })
    );
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    console.log("in redirecting");
    if (this.state.redirect) {
      localStorage.setItem("visitedstudent", this.state.id);
      return <Redirect to={`/donor/profile/${this.state.id}`} />;
    }
  };
  render() {
    return (
      <div className="main-div">
        {this.renderRedirect()}
        <div className="style__secondary-nav___3_H_G pb-2 mb-3" align="center">
          <h2 className="ml-5" style={{ fontSize: "20px", fontWeight: "600" }}>
            Donors List
          </h2>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-3">
              <div className="card">
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                    Filters
                  </h3>
                </div>
                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Name{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter a name..."
                    onChange={(e) => {
                      // this.filterName(e.target.value);
                      this.setState(
                        { studentnameFilter: e.target.value || "empty" },
                        () => {
                          this.getFilterList();
                        }
                      );
                    }}
                  ></input>
                </div>
                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Major{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter a major..."
                    onChange={(e) => {
                      // this.filterMajor(e.target.value);
                      this.setState(
                        { majorFilter: e.target.value || "empty" },
                        () => {
                          this.getFilterList();
                        }
                      );
                    }}
                  ></input>
                </div>
                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    College Name{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter college name..."
                    onChange={(e) => {
                      //   this.filterCollege(e.target.value);
                      this.setState(
                        { collegeFilter: e.target.value || "empty" },
                        () => {
                          this.getFilterList();
                        }
                      );
                    }}
                  ></input>
                </div>

                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Skills{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter a skill..."
                    onChange={(e) => {
                      // this.filterSkill(e.target.value);
                      this.setState(
                        { skillFilter: e.target.value || "empty" },
                        () => {
                          this.getFilterList();
                        }
                      );
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-9" align="center">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <div className="style__card-item___B1f7m:last-child"></div>
                  <div className="style__media-body___1_M6P">
                    {console.log(
                      this.props.list ? this.props.list.donors.docs[0] : ""
                    )}
                    {this.state.studentarr
                      ? this.state.studentarr.map((i) => (
                          <div>
                            <div className="p-2">
                              <div class="card mt-4">
                                <div
                                  className="m-3"
                                  style={{
                                    
                                    cursor: "pointer"
                                  }}
                                  onClick={(e) => {
                                    this.setRedirect(i._id);
                                    this.setState({
                                      id: i._id,
                                    });
                                  }}
                                >
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                      <div className="col-5">
                                        <img
                                          style={{
                                            width: "120px",
                                          }}
                                          src={`${api_route.host}//${i.profilePic}`}
                                        ></img>
                                      </div>
                                      <div>
                                        <h3
                                          className="ml-5"
                                          style={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {" "}
                                          {i ? i.name : ""}
                                        </h3>

                                        <h3
                                          className="ml-5"
                                          style={{
                                            fontSize: "16px",
                                            fontWeight: "400",
                                          }}
                                        >
                                          {" "}
                                          {i ? i.about : ""}
                                        </h3>
                                        {/* <div className="ml-5">
                                          {i.skills ? i.skills : ""}
                                        </div> */}
                                      </div>
                                    </div>
                                    {/* <div className="d-flex justify-content-between"> */}
                                    <div>
                                      {/* <h3
                                        className="ml-5"
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "400",
                                          color: "rgba(0,0,0,.8)",
                                        }}
                                      >
                                        {" "}
                                        {i.educations.educations_level
                                          ? i.educations.educations_level + ","
                                          : ""}
                                        {i.educations.major
                                          ? i.educations.major
                                          : ""}
                                      </h3> */}

                                      {/* {i.educations.end_time ? (
                                        <h3
                                          className="mr-5"
                                          style={{
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            color: "rgba(0,0,0,.8)",
                                          }}
                                        >
                                          Graduate On{" "}
                                          {i.educations.end_time
                                            ? i.educations.end_time
                                            : ""}
                                        </h3>
                                      ) : (
                                        ""
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>

                <div
                  align="center"
                  className="align-self-center"
                  style={{ backgroundColor: "white" }}
                >
                  <Pagination
                    hideFirstLastPages
                    activePage={this.state.page}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.state.count}
                    pageRangeDisplayed={4}
                    onChange={this.handlePageChange.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    list: state.studentListReducer.studentlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: (payload) => dispatch(getStudents(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DonorList);
