import React, { Component } from "react";
import "../styles/jobs.css";
import JobDescription from "./JobDescription";
import api_route from "../app-config";
import axios from "axios";

import { connect } from "react-redux";
import { getJobs } from "../redux/actions/jobAndEventAction";
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

class StudentJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobarr: [],
      jobobj: "",
      perjobarr: [],
      companyFilter: "empty",
      locationFilter: "empty",
      categoryFilter: "empty",
      sortFilter:"empty",
      page: "1",
      limit: "10",
     
    };
  }

  getFilterJobs = () => {
    this.props.getJobs({
      companyFilter: this.state.companyFilter,
      locationFilter: this.state.locationFilter,
      categoryFilter: this.state.categoryFilter,
      sortFilter:this.state.sortFilter,
      page: this.state.page,

      limit: this.state.limit
    });
  };
  componentWillMount() {
    this.props.getJobs({
      companyFilter: this.state.companyFilter,
      locationFilter: this.state.locationFilter,
      categoryFilter: this.state.categoryFilter,
      sortFilter:this.state.sortFilter,
      page: this.state.page,
      limit: this.state.limit
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ jobarr: nextProps.jobarr });
    this.setState({ perjobarr: nextProps.jobarr });
    this.setState({ jobobj: nextProps.jobarr ? nextProps.jobarr[0] : "" });
    // this.setState({})
    // this.setState({})
  }
  componentDidMount() {
    console.log(this.props.jobarr);
  }
  filterByTitleOrCompany = value => {
    let result = [];
    console.log(value);
    this.state.perjobarr.map(i => {
      console.log(i.company_name.indexOf(value));
      if (
        i.job_title.toLowerCase().indexOf(value) >= 0 ||
        i.company_name.toLowerCase().indexOf(value) >= 0 ||
        i.job_title.indexOf(value) >= 0 ||
        i.company_name.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ jobarr: result });
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState(
      { page: pageNumber },
      this.props.getJobs({
        companyFilter: this.state.companyFilter,
        locationFilter: this.state.locationFilter,
        categoryFilter: this.state.categoryFilter,
        sortFilter:this.state.sortFilter,
        page: pageNumber,
        limit: this.state.limit
      })
    );
  }

  filterByLocation = value => {
    let result = [];
    console.log(value);
    this.state.perjobarr.map(i => {
      //console.log( i.company_name.indexOf(value))
      if (
        i.location.toLowerCase().indexOf(value) >= 0 ||
        i.location.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ jobarr: result });
  };

  render() {
    return (
      <div className="maindiv ">
        <div className="style__secondary-nav___3_H_G pb-2 mb-3" align="center">
          <h2 className="ml-5" style={{ fontSize: "20px", fontWeight: "600" }}>
            Job Search
          </h2>
        </div>
        <div className="container mt-3">
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
                  placeholder="Job titles, employers, or keywords"
                  onChange={e => {
                    this.setState(
                      { companyFilter: e.target.value || "empty" },
                      () => {
                        this.getFilterJobs();
                      }
                    );
                    // this.filterByTitleOrCompany(e.target.value)
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
                    // this.filterByLocation(e.target.value);
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
            <div className='d-flex justify-content-between'>            
            <div className="d-flex p-2 ml-2">
              <button
                className="style__pill___3uHDM"
                onClick={e => {
                  //   const result = this.state.perjobarr.filter(
                  //     i => i.job_category == "Full-Time"
                  //   );
                  //   this.setState({ jobarr: result });
                  // }
                  this.setState({ categoryFilter: "Full-Time" }, () => {
                    this.getFilterJobs();
                  });
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
                  this.setState({ categoryFilter: "Part-Time" }, () => {
                    this.getFilterJobs();
                  });
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
                  this.setState({ categoryFilter: "Internship" }, () => {
                    this.getFilterJobs();
                  });
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
                  this.setState({ categoryFilter: "On-Campus" }, () => {
                    this.getFilterJobs();
                  });
                }}
              >
                On-Campus
              </button>
            </div>
            <div className="mr-4">
            <form>
           
            <select className="form-control" value={this.state.sortFilter} onChange={e=>{
              e.preventDefault();
              this.setState({sortFilter:e.target.value},()=>
              {
                    this.getFilterJobs();
                  })
              

            }} placeholder=''>
            <option value="" disabled selected>Sort by:Featured</option>
            <option value="DeadlineAsc">Deadline asc</option>
            <option value="DeadlineDesc">Deadline desc</option>
            <option value="LocationAsc">Location asc</option>
            <option value="LocationDesc">Location desc</option>
            <option value="PostedonAsc">Posted on asc</option>
            <option value="PostedonDesc">Posted on desc</option>
          </select>
         
            </form>
            </div>
            </div>

          </div>
        </div>

        <div className="container">
          <div className="row mt-3">
            <div className="col-4">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <h4
                    className="m-2"
                    style={{ fontWeight: "200px", fontSize: "18px" }}
                  >
                    {" "}
                    Few jobs are shown here which match your interests
                  </h4>
                  {this.state.jobarr
                    ? this.state.jobarr.map(i => (
                        <div key={i.job_id}>
                          <div
                            className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                            onClick={e => {
                              this.setState({ jobobj: i });
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
                              {i.company_name}
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
                    totalItemsCount={this.props.count}
                    pageRangeDisplayed={4}
                    onChange={this.handlePageChange.bind(this)}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <JobDescription jobdata={this.state.jobobj} />
                </div>
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
    jobarr: state.jobReducer.jobarr,
    count: state.jobReducer.count,
    limit: state.jobReducer.limit
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getJobs: payload => dispatch(getJobs(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentJobs);
