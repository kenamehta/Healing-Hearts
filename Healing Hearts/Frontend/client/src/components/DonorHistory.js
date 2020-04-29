import React, { Component } from "react";
import axios from "axios";
import "../styles/jobs.css";
import api_route from "../app-config";
import ApplicationDescription from "./ApplicationDescription";
import { connect } from "react-redux";
import { getAppliedJobs } from "../redux/actions/applicationAction";
import Pagination from "react-js-pagination";

class DonorHistory extends Component {
  state = {
    jobarr: "",
    perjobArr: "",
    jobobj: "",
    companyAndTitleFilter: "empty",
    locationFilter: "empty",
    statusFilter: "empty",
    page: "1",
    limit: "10",
    count: ""
  };

  componentWillMount() {
    this.props.getAppliedJobs({
      statusFilter: this.state.statusFilter,
      page: this.state.page,
      limit: this.state.limit
    });
    //this.props.fetchRegisteredEvents()
  }
  getFilterJobs = () => {
    this.props.getAppliedJobs({
      statusFilter: this.state.statusFilter,
      page: this.state.page,
      limit: this.state.limit
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ jobarr: nextProps.result });
    this.setState({ perjobArr: nextProps.result });
    this.setState({ jobobj: nextProps.result[0] });
    this.setState({ count: nextProps.total });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState(
      { page: pageNumber },
      this.props.getAppliedJobs({
        statusFilter: this.state.statusFilter,
        page: pageNumber,
        limit: this.state.limit
      })
    );
  }
  render() {
    return (
      <div className="maindiv">
        <div className="style__secondary-nav___3_H_G pb-2 mb-3" align="center">
          <h2 className="ml-5" style={{ fontSize: "20px", fontWeight: "600" }}>
            Your Applications
          </h2>
        </div>
        <div className="container mt-3">
          <div className="card">
            <div className="d-flex p-2 ml-5">
              <button
                className="style__pill___3uHDM"
                onClick={e => {
                  this.setState({ statusFilter: "Pending" }, () => {
                    this.getFilterJobs();
                  });
                }}
              >
                Pending
              </button>
              <button
                className="style__pill___3uHDM"
                onClick={e => {
                  this.setState({ statusFilter: "Reviewed" }, () => {
                    this.getFilterJobs();
                  });
                }}
              >
                Reviewed
              </button>
              <button
                className="style__pill___3uHDM"
                onClick={e => {
                  this.setState({ statusFilter: "Declined" }, () => {
                    this.getFilterJobs();
                  });
                }}
              >
                Declined
              </button>
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
                    All your applied jobs are shown here{" "}
                  </h4>
                  {this.state.jobarr ? (
                    this.state.jobarr.map(i => (
                      <div key={i.job_id}>
                        <div
                          className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                          onClick={e => {
                            this.setState({ jobobj: i });
                          }}
                        >
                          <div className="d-flex">
                            <ion-icon name="briefcase" />
                            <h3
                              className="ml-2"
                              style={{ fontSize: "16px", fontWeight: "700" }}
                            >
                              {i.job_id.job_title}
                            </h3>
                          </div>
                          <h3 style={{ fontSize: "16px", fontWeight: "400" }}>
                            {i.job_id.company_name}
                          </h3>
                          <h3
                            style={{
                              color: "rgba(0,0,0,.56)",
                              fontWeight: "200px",
                              fontSize: "14px"
                            }}
                          >
                            {i.job_id.job_category} Job
                          </h3>
                          <h3
                            style={{
                              color: "rgba(0,0,0,.56)",
                              fontWeight: "200px",
                              fontSize: "14px"
                            }}
                          >
                            Applied for this job on{" "}
                            {i ? i.createdAt.split("T")[0] : ""}{" "}
                          </h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    ""
                  )}
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
            <div className="col-8">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <ApplicationDescription jobdata={this.state.jobobj} />
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
    result: state.applicationReducer.result,
    total: state.applicationReducer.total
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAppliedJobs: payload => dispatch(getAppliedJobs(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DonorHistory);
