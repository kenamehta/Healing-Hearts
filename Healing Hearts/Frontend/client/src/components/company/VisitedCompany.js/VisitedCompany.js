import React, { Component } from "react";
import api_route from "../../../app-config";
import axios from "axios";
import "../../../styles/companyprofilepic.css";
import "../../../styles/company.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCompanyProfile,
  editCompanyProfile,
  editProfilePic,
  createJobs
} from "../../../redux/actions/companyAction";
import Pagination from "react-js-pagination";
class VisitedCompany extends Component {
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
    fundraisertitle: "",
    value: "",
    fundraiserCategory: "Animals",
    joblocation: "",
    salary: "",
    deadline: "",
    funddesc: "",
    addSuccessMsg: "",
    id: "",
    propicture: "",
    companyFilter: "empty",
    locationFilter: "empty",
    categoryFilter: "empty",
    sortFilter: "empty",
    page: "1",
    limit: "10",
    count: "",
    amount: ""
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
      this.setState({ addSuccessMsg: "Fundraiser added Successfully" });
      let newarr = this.state.perjobarr;
      newarr.push(nextProps.jobobj);
      console.log(newarr);

      this.setState({ jobarr: newarr });
      this.setState({ perjobarr: newarr });
    }
  }
  componentDidMount() {
    let config = {
      headers: {
        Authorization: `${window.localStorage.getItem("student")}`
      }
    };
    console.log("mounting in education------------");
    //this.setState({educationarr:this.props.educationData})
    try {
      console.log("In try bloc");
      axios
        .get(
          `${api_route.host}/company/${localStorage.getItem("visitedcompany")}`,
          config
        )
        .then(res => {
          this.setState({ companyobj: res.data.company });
          console.log(res.data.company);
          if (res.data.company.company_basic_details.profilePic) {
            var src = `${api_route.host}//${res.data.company
              .company_basic_details.profilePic}`;
            this.setState({ propicture: src });
          }
          try {
            console.log("In try bloc");
            axios
              .get(
                `${api_route.host}/jobs/${res.data.company.company_basic_details
                  .companyName}/empty/empty/empty`,
                config
              )
              .then(res => {
                this.setState({ jobarr: res.data.result });
                this.setState({ perjobarr: res.data.result });
                this.setState({ jobobj: res.data.result[0] });
                console.log(this.state.companyobj);
                const result = this.state.perjobarr.filter(
                  i =>
                    i.company_basic_detail.company_basic_detail_id ==
                    this.state.companyobj.company_basic_details
                      .company_basic_detail_id
                );
                console.log(result);
                this.setState({ jobarr: result });
              })
              .catch(err => {
                console.log(err);
              });
          } catch (err) {
            console.log(err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    console.log("getting education in mount");
    //  this.props.getEducation();
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
      fundraiser: {
        title: this.state.fundraisertitle,
        amount: this.state.amount,
        description: this.state.funddesc,
        category: this.state.fundraiserCategory
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
                      this.state.companyobj.company_basic_details.companyName
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
                      className="ml-1"
                    >
                      {this.state.companyobj.company_basic_details ? (
                        this.state.companyobj.company_basic_details.location
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="d-flex ml-2">
                    <ion-icon name="call" />
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-1"
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
              </div>
            </div>
            <div className="container mt-3 p-2 pb-5" />
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex col-6 mt-2">
                  <div
                    className="m-2 ml-1"
                    style={{ left: "40px", position: "relative" }}
                  >
                    <ion-icon name="search" />
                  </div>
                  <input
                    type="text"
                    className="form-control p-2 pl-4 mx-3"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="style__divider___1j_Fp mb-3" />
              <div className="style__jobs___3seWY" style={{ height: "500px" }}>
                {this.state.jobarr ? (
                  this.state.jobarr.map(i => (
                    <div className="" key={i._id}>
                      <div
                        className="style__selected___1DMZ3 p-2 line jobdiv m-1 card"
                        onClick={e => {
                          this.setRedirect(i._id);
                          this.setState({ id: i._id });
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <ion-icon name="briefcase" />
                            <h3
                              className="ml-2 line"
                              style={{ fontSize: "16px", fontWeight: "700" }}
                            >
                              {i.title}
                            </h3>
                          </div>
                          <h3 style={{ fontSize: "16px", fontWeight: "400" }}>
                            <i>{i ? i.companyName : ""}</i>
                          </h3>
                        </div>
                        <h3
                          className="ml-2 mt-2"
                          style={{
                            //color: "rgba(0,0,0,.56)",
                            fontWeight: "200px",
                            fontSize: "14px"
                          }}
                        >
                          Wish to raise ${i.amount}
                        </h3>
                        <h3
                          className="ml-2 mt-2"
                          style={{
                            color: "rgba(0,0,0,.56)",
                            fontWeight: "200px",
                            fontSize: "14px"
                          }}
                        >
                          <b>Category:</b> {i.category}
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
export default connect(mapStateToProps, mapDispatchToProps)(VisitedCompany);
