import React, { Component } from "react";
import api_route from "../../app-config";
import axios from "axios";
import "../../styles/companyprofilepic.css";
import "../../styles/company.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCompanyProfile,
  editCompanyProfile,
  editProfilePic,
  createJobs
} from "../../redux/actions/companyAction";
import Pagination from "react-js-pagination";
class CompanyHome extends Component {
  state = {
    companyobj: "",
    showInfo: "block",
    editInfo: "none",
    name: "",
    phone: "",
    location: "",
    jobarr: [],
    jobobj: "",
    perjobarr: [],
    modalShow: "none",
    jobtitle: "",
    value: "Full-Time",
    job_category: "Full-Time",
    joblocation: "",
    salary: "",
    deadline: "",
    jobdescription: "",
    addSuccessMsg: "",
    id: "",
    propicture: "",
    companyFilter: "empty",
    locationFilter: "empty",
    categoryFilter: "empty",
    sortFilter: "empty",
    page: "1",
    limit: "10",
    count: ""
  };
  componentWillMount() {
    this.props.getCompanyProfile({
      companyFilter: this.state.companyFilter,
      locationFilter: this.state.locationFilter,
      categoryFilter: this.state.categoryFilter,
      sortFilter: this.state.categoryFilter,
      page: this.state.page,
      limit: this.state.limit
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState(
      { page: pageNumber },
      this.props.getCompanyProfile({
        companyFilter: this.state.companyFilter,
        locationFilter: this.state.locationFilter,
        categoryFilter: this.state.categoryFilter,
        sortFilter: this.state.categoryFilter,
        page: pageNumber,
        limit: this.state.limit
      })
    );
  }

  getFilterJobs = () => {
    this.props.getCompanyProfile({
      companyFilter: this.state.companyFilter,
      locationFilter: this.state.locationFilter,
      categoryFilter: this.state.categoryFilter,
      page: this.state.page,
      limit: this.state.limit
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ perjobarr: nextProps.companyobj.perjobarr });
    this.setState({ jobarr: nextProps.companyobj.jobarr });
    this.setState({ companyobj: nextProps.companyobj.companyobj });
    this.setState({ propicture: nextProps.companyobj.propicture });
    this.setState({ count: nextProps.companyobj.total });
    if (nextProps.propicture) {
      this.setState({ propicture: nextProps.propicture });
    }
    if (nextProps.companyobject) {
      this.setState({ companyobj: nextProps.companyobject });
    }
    if (nextProps.jobobj) {
      this.setState({ addSuccessMsg: "Job added Successfully" });
      let newarr = this.state.perjobarr;
      newarr.push(nextProps.jobobj);
      console.log(newarr);

      this.setState({ jobarr: newarr });
      this.setState({ perjobarr: newarr });
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    console.log("in redirecting");
    if (this.state.redirect) {
      localStorage.setItem("jobid", this.state.id);
      return <Redirect to={`/job/student/${this.state.id}`} />;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();

    // let config = {
    //   headers: {
    //     Authorization: `${window.localStorage.getItem("company")}`
    //   }
    // };
    let data = {
      job: {
        job_title: this.state.jobtitle,
        deadline: this.state.deadline,
        location: this.state.joblocation,
        salary: this.state.salary,
        job_description: this.state.jobdescription,
        job_category: this.state.job_category
      }
    };
    this.props.createJobs(data);
  };

  editCompanyInfo = e => {
    let data = {
      company: {
        location: this.state.location ? this.state.location : "",
        phone: this.state.phone ? this.state.phone : "",
        name: this.state.name ? this.state.name : ""
      }
    };
    this.props.editCompanyProfile(data);
  };

  updatePic = e => {
    e.preventDefault();
    this.props.editProfilePic(this.state.picture);
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="container d-flex mt-3 p-2 pb-5">
          <div className="col-3">
            <div className="card mt-3">
              <div className="card-title p-2" align="center">
                <div>
                  <div align="center" className="mt-2">
                    {this.state.propicture ? (
                      <div className="style__edit-photo___B-_os">
                        <img
                          className="circular-avatar-image avatar-image"
                          src={this.state.propicture}
                        />
                      </div>
                    ) : (
                      <form onSubmit={this.updatePic}>
                        <div>
                          <button className="style__edit-photo___B-_os">
                            <div>
                              <ion-icon
                                size="large"
                                name="camera"
                                style={{ color: "#1569e0" }}
                              />
                            </div>

                            <div>
                              {" "}
                              <input
                                style={{ color: "#1569e0", fontSize: "13px" }}
                                type="file"
                                name="file"
                                onChange={e => {
                                  console.log(e.target.files[0]);
                                  this.setState({ picture: e.target.files[0] });
                                }}
                              />
                            </div>
                          </button>
                        </div>

                        <input
                          style={{ fontSize: "10px" }}
                          type="submit"
                          className="btn btn-primary mt-3"
                          value="Edit Pic"
                        />
                      </form>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    {this.state.companyobj.company_basic_details ? (
                      this.state.companyobj.company_basic_details.company_name
                    ) : (
                      ""
                    )}
                  </h3>
                </div>
              </div>
              <div
                style={{ display: this.state.showInfo }}
                align="center"
                className="ml-4"
              >
                {" "}
                <div className="d-flex">
                  <div className="d-flex">
                    <ion-icon name="location" />
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-2"
                    >
                      {this.state.companyobj.company_basic_details ? (
                        this.state.companyobj.company_basic_details.location
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="d-flex ml-3">
                    <ion-icon name="call" />
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-2"
                    >
                      {this.state.companyobj.company_basic_details ? (
                        this.state.companyobj.company_basic_details.phone
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
                <div className="mr-3">
                  <p style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}>
                    {" "}
                    email:{" "}
                    {this.state.companyobj.company_basic_details ? (
                      this.state.companyobj.company_basic_details.emailId
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  {this.state.companyobj.company_basic_details ? (
                    this.state.companyobj.company_basic_details.description
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div
                style={{ display: this.state.editInfo }}
                align="center"
                className=""
              >
                <table>
                  <tr>
                    <td>Name</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            this.state.companyobj.company_basic_details ? (
                              this.state.companyobj.company_basic_details
                                .company_name
                            ) : (
                              ""
                            )
                          }
                          onChange={e => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </div>
                    </td>
                  </tr>

                  <div className="mt-1" />
                  <tr>
                    <td>Phone</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            this.state.companyobj.company_basic_details ? (
                              this.state.companyobj.company_basic_details.phone
                            ) : (
                              ""
                            )
                          }
                          onChange={e => {
                            this.setState({ phone: e.target.value });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  <div className="mt-1" />
                  <tr>
                    <td>Location</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            this.state.companyobj.company_basic_details ? (
                              this.state.companyobj.company_basic_details
                                .location
                            ) : (
                              ""
                            )
                          }
                          onChange={e => {
                            this.setState({ location: e.target.value });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </table>
                <div
                  style={{ display: this.state.editInfo }}
                  className="col-7 ml-2 mt-2"
                >
                  <button
                    className="btn btn-primary m-2"
                    onClick={e => {
                      this.setState({ editInfo: "none", showInfo: "block" });
                      this.editCompanyInfo();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* <div className="p-2">
                <p>
                  {this.state.companyobj
                    ? this.state.companyobj.company_profile.description
                    : ""}
                </p>
              </div> */}
              <div
                style={{ display: this.state.showInfo }}
                className="col-7 ml-5 mt-2"
                align="center"
              >
                <button
                  className="btn btn-primary m-2"
                  onClick={e => {
                    this.setState({ editInfo: "block", showInfo: "none" });
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="container mt-3 p-2 pb-5" />
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex col-6 mt-2">
                  <div
                    className="m-2"
                    style={{ left: "40px", position: "relative" }}
                  >
                    <ion-icon name="search" />
                  </div>
                  <input
                    type="text"
                    className="form-control p-2 pl-4"
                    placeholder="Category"
                    onChange={e => {
                      this.setState(
                        { categoryFilter: e.target.value || "empty" },
                        () => {
                          this.getFilterJobs();
                        }
                      );
                      //  this.filterByTitleOrCompany(e.target.value);
                    }}
                  />
                </div>

                <div className="mr-3">
                  <div className="p-2 ml-2">
                    <button
                      className="style__pill___3uHDM"
                      onClick={e => {
                        this.setState({ modalShow: "block" });
                      }}
                    >
                      <ion-icon name="add" />
                      Create a Fundraiser
                    </button>
                  </div>
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
                        <span
                          class="close"
                          onClick={e => {
                            this.setState({ modalShow: "none" });
                            this.setState({ addSuccessMsg: "" });
                          }}
                        >
                          &times;
                        </span>
                        {this.state.addSuccessMsg ? (
                          <p style={{ color: "green" }}>
                            {this.state.addSuccessMsg}
                          </p>
                        ) : (
                          ""
                        )}
                        <div align="center">
                          <h3
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            New Fundraiser
                          </h3>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group col-md-11">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px"
                              }}
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id="jobtitle"
                              name="jobtitle"
                              className="form-control"
                              placeholder="Enter Title"
                              onChange={e => {
                                this.setState({ jobtitle: e.target.value });
                              }}
                              required
                            />
                          </div>
                          <div className="form-group col-md-11">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px"
                              }}
                            >
                              Category
                            </label>
                            <select
                              value={this.state.job_category}
                              id="category"
                              className="form-control"
                              onChange={e => {
                                this.setState({ job_category: e.target.value });
                              }}
                              required
                            >
                              <option value="Animals">Animals</option>
                              <option value="Children">Children</option>
                              <option value="Coronavirus">Coronavirus</option>
                              <option value="Homeless">Homeless</option>
                              <option value="Poverty">Poverty</option>
                            </select>
                          </div>

                          <div className="form-group col-md-11">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px"
                              }}
                            >
                              Description
                            </label>
                            <textarea
                              id="jobdescription"
                              name="jobdescription"
                              className="form-control"
                              placeholder="Enter Description"
                              onChange={e => {
                                this.setState({
                                  jobdescription: e.target.value
                                });
                              }}
                              required
                            />
                          </div>
                          <div className="form-group" align="center">
                            <input
                              type="submit"
                              className="btn btn btn-primary"
                              value="Create"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="style__divider___1j_Fp mb-3" />
              <div className="style__jobs___3seWY" style={{ height: "500px" }}>
                {this.state.jobarr ? (
                  this.state.jobarr.map(i => (
                    <div key={i._id}>
                      <div
                        className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                        onClick={e => {
                          this.setRedirect(i._id);
                          this.setState({ id: i._id });
                        }}
                      >
                        <div className="d-flex">
                          <ion-icon name="briefcase" />
                          <h3
                            className="ml-2"
                            style={{ fontSize: "16px", fontWeight: "700" }}
                          >
                            {i.job_title}
                          </h3>
                        </div>
                        <h3 style={{ fontSize: "16px", fontWeight: "400" }}>
                          {i ? i.company_name : ""}
                        </h3>
                        <h3
                          style={{
                            color: "rgba(0,0,0,.56)",
                            fontWeight: "200px",
                            fontSize: "14px"
                          }}
                        >
                          {i.job_category} Job
                        </h3>
                      </div>
                    </div>
                  ))
                ) : (
                  ""
                )}
              </div>
              <div
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
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    jobobj: state.companyReducer.jobobj,
    companyobj: state.companyReducer.companyobj,
    companyobject: state.companyReducer.companyobject,
    propicture: state.companyReducer.propicture
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editCompanyProfile: payload => dispatch(editCompanyProfile(payload)),
    getCompanyProfile: payload => dispatch(getCompanyProfile(payload)),
    editProfilePic: payload => dispatch(editProfilePic(payload)),
    createJobs: payload => dispatch(createJobs(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome);
