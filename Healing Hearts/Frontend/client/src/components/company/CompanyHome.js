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
    companyFilter:'empty',
    locationFilter:'empty',
    categoryFilter:'empty',
    sortFilter: "empty",
    page: "1",
    limit: "10",
    count: ""
  };
  componentWillMount() {
    this.props.getCompanyProfile({
      companyFilter: this.state.companyFilter,
      locationFilter: this.state.locationFilter,
      categoryFilter:this.state.categoryFilter,
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
        categoryFilter:this.state.categoryFilter,
        sortFilter: this.state.categoryFilter,
        page:pageNumber,
        limit: this.state.limit
       
      })
    );
  }

  getFilterJobs = () => {
    this.props.getCompanyProfile({
      companyFilter: this.state.companyFilter,
      locationFilter: this.state.locationFilter,
      categoryFilter:this.state.categoryFilter,
      page: this.state.page,
      limit: this.state.limit
     
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.companyobj.total)
    this.setState({ perjobarr: nextProps.companyobj.perjobarr });
    this.setState({ jobarr: nextProps.companyobj.jobarr });
    this.setState({ companyobj: nextProps.companyobj.companyobj });
    this.setState({ propicture: nextProps.companyobj.propicture });
    this.setState({count:nextProps.companyobj.total})
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
                        <img src={this.state.propicture} />
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
                              ></ion-icon>
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
                              ></input>
                            </div>
                          </button>
                        </div>

                        <input
                          style={{ fontSize: "10px" }}
                          type="submit"
                          className="btn btn-primary mt-3"
                          value="Edit Pic"
                        ></input>
                      </form>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    {this.state.companyobj.company_basic_details
                      ? this.state.companyobj.company_basic_details.company_name
                      : ""}
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
                  <div className="d-flex ml-3">
                    <ion-icon name="location"></ion-icon>
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-2"
                    >
                      {this.state.companyobj.company_basic_details
                        ? this.state.companyobj.company_basic_details.location
                        : ""}
                    </p>
                  </div>
                  <div className="d-flex ml-3">
                    <ion-icon name="call"></ion-icon>
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-2"
                    >
                      {this.state.companyobj.company_basic_details
                        ? this.state.companyobj.company_basic_details.phone
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="mr-3">
                  <p style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}>
                    {" "}
                    email:{" "}
                    {this.state.companyobj.company_basic_details
                      ? this.state.companyobj.company_basic_details.emailId
                      : ""}
                  </p>
                </div>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  {this.state.companyobj.company_basic_details
                    ? this.state.companyobj.company_basic_details.description
                    : ""}
                </p>
              </div>
              <div
                style={{ display: this.state.editInfo }}
                align="center"
                className="ml-4"
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
                            this.state.companyobj.company_basic_details
                              ? this.state.companyobj.company_basic_details
                                  .company_name
                              : ""
                          }
                          onChange={e => {
                            this.setState({ name: e.target.value });
                          }}
                        ></input>
                      </div>
                    </td>
                  </tr>

                  <div className="mt-1"></div>
                  <tr>
                    <td>Phone</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            this.state.companyobj.company_basic_details
                              ? this.state.companyobj.company_basic_details
                                  .phone
                              : ""
                          }
                          onChange={e => {
                            this.setState({ phone: e.target.value });
                          }}
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <div className="mt-1"></div>
                  <tr>
                    <td>Location</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            this.state.companyobj.company_basic_details
                              ? this.state.companyobj.company_basic_details
                                  .location
                              : ""
                          }
                          onChange={e => {
                            this.setState({ location: e.target.value });
                          }}
                        ></input>
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
            <div className="container mt-3 p-2 pb-5"></div>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex col-6">
                  <div
                    className="m-2"
                    style={{ left: "40px", position: "relative" }}
                  >
                    <ion-icon name="search"></ion-icon>
                  </div>
                  <input
                    type="text"
                    className="form-control p-2 pl-5"
                    placeholder="Job titles or keywords"
                    onChange={e => {
                      this.setState(
                      { companyFilter: e.target.value || "empty" },
                      () => {
                        this.getFilterJobs();
                      }
                    );
                      //  this.filterByTitleOrCompany(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex col-6">
                  <div
                    className="m-2"
                    style={{ left: "40px", position: "relative" }}
                  >
                    <ion-icon name="location"></ion-icon>
                  </div>
                  <input
                    type="text"
                    className="form-control p-2 pl-5"
                    placeholder="City, State, Zip Code, or Address"
                    onChange={e => {
                    //  this.filterByLocation(e.target.value);
                    this.setState(
                      { locationFilter: e.target.value || "empty" },
                      () => {
                        this.getFilterJobs();
                      }
                    );
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex p-2 ml-2">
                  <button
                    className="style__pill___3uHDM"
                    onClick={e => {
                      // const result = this.state.perjobarr.filter(
                      //   i => i.job_category == "Full-Time"
                      // );
                      // this.setState({ jobarr: result });
                      this.setState(
                      { 
                        categoryFilter: "Full-Time"},
                    () => {
                      this.getFilterJobs();
                    }
                  );
                    }}
                  >
                    Full-Time Job
                  </button>
                  <button
                    className="style__pill___3uHDM"
                    onClick={e => {
                      // const result = this.state.perjobarr.filter(
                      //   i => i.job_category == "Part-Time"
                      // );
                      // this.setState({ jobarr: result });
                      this.setState(
                    { categoryFilter: "Part-Time"},
                    () => {
                      this.getFilterJobs();
                    }
                  );
                    }}
                  >
                    Part-Time
                  </button>
                  <button
                    className="style__pill___3uHDM"
                    onClick={e => {
                      // const result = this.state.perjobarr.filter(
                      //   i => i.job_category == "Internship"
                      // );
                      // this.setState({ jobarr: result });
                      this.setState(
                    { categoryFilter: "Internship"},
                    () => {
                      this.getFilterJobs();
                    }
                  );
                    }}
                  >
                    Internship
                  </button>
                  <button
                    className="style__pill___3uHDM"
                    onClick={e => {
                      // const result = this.state.perjobarr.filter(
                      //   i => i.job_category == "On-Campus"
                      // );
                      // this.setState({ jobarr: result });
                      this.setState(
                    { categoryFilter: "On-Campus"},
                    () => {
                      this.getFilterJobs();
                    }
                  );
                    }}
                  >
                    On-Campus
                  </button>
                </div>
                <div className="p-2 ml-2">
                  <button
                    className="style__pill___3uHDM"
                    onClick={e => {
                      this.setState({ modalShow: "block" });
                    }}
                  >
                    <ion-icon name="add"></ion-icon>
                    Add Jobs
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
                        <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                          New Job
                        </h3>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Job Title
                          </label>
                          <input
                            type="text"
                            id="jobtitle"
                            name="jobtitle"
                            className="form-control"
                            placeholder="Enter Job Title"
                            onChange={e => {
                              this.setState({ jobtitle: e.target.value });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
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
                            <option value="Full-Time">Full Time</option>
                            <option value="Part-Time">Part Time</option>
                            <option value="On-Campus">On Campus</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                        <div className="form-group col-md-11">
                          <div>
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px"
                              }}
                            >
                              Location
                            </label>
                          </div>

                          <label
                            style={{
                              fontWeight: "500",
                              fontSize: "13px",
                              marginBottom: "5px"
                            }}
                          >
                            Please enter location
                          </label>
                          <input
                            type="text"
                            id="joblocation"
                            name="joblocation"
                            className="form-control"
                            placeholder="Eg. New York"
                            onChange={e => {
                              this.setState({ joblocation: e.target.value });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="col-md-11 d-flex p-0">
                          <div className="form-group col-md-6 ">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px"
                              }}
                            >
                              Salary
                            </label>
                            <input
                              type="number"
                              id="salary"
                              name="salary"
                              className="form-control"
                              placeholder="Eg. 500000"
                              onChange={e => {
                                this.setState({ salary: e.target.value });
                              }}
                              required
                            ></input>
                          </div>
                          <div className="form-group col-md-6">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px"
                              }}
                            >
                              Deadline
                            </label>
                            <input
                              type="date"
                              id="deadline"
                              name="deadline"
                              className="form-control"
                              placeholder="Deadline"
                              onChange={e => {
                                this.setState({
                                  deadline: e.target.value
                                });
                              }}
                              required
                            ></input>
                          </div>
                        </div>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Description
                          </label>
                          <textarea
                            id="jobdescription"
                            name="jobdescription"
                            className="form-control"
                            placeholder="Enter Job Description"
                            onChange={e => {
                              this.setState({ jobdescription: e.target.value });
                            }}
                            required
                          ></textarea>
                        </div>
                        <div className="form-group col-md-8 m-3">
                          <input
                            type="submit"
                            className="btn btn btn-primary"
                          ></input>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="style__jobs___3seWY" style={{ height: "500px" }}>
                {this.state.jobarr
                  ? this.state.jobarr.map(i => (
                      <div key={i._id}>
                        <div
                          className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                          onClick={e => {
                            this.setRedirect(i._id);
                            this.setState({ id: i._id });
                          }}
                        >
                          <div className="d-flex">
                            <ion-icon name="briefcase"></ion-icon>
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
                  : ""}
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
