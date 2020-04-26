import React, { Component } from "react";
import api_route from "../../app-config";
import axios from "axios";
import "../../styles/profilepic.css";
import "../../styles/company.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchEvents, createEvent } from "../../redux/actions/companyAction";
import Pagination from "react-js-pagination";
class CompanyEvent extends Component {
  state = {
    companyobj: "",
    showInfo: "block",
    editInfo: "none",

    jobarr: [],
    jobobj: "",
    perjobarr: [],
    modalShow: "none",
    eventtitle: "",
    value: "All",
    addSuccessMsg: "",
    id: "",
    date: "",
    location: "",
    event_time: "",
    event_description: "",
    eligibility: "",
    locationAndTitleFilter:'empty',
    page: "1",
    limit: "3",
    count: ""
  };

  componentWillMount() {
    this.props.fetchEvents({
      locationAndTitleFilter:this.state.locationAndTitleFilter,
      page: this.state.page,
      limit: this.state.limit
    });
  }
  getFilterEvents=()=>{
    this.props.fetchEvents({
      locationAndTitleFilter:this.state.locationAndTitleFilter,
      page: this.state.page,
      limit: this.state.limit
    })
   }
   handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState(
      { page: pageNumber },
      this.props.fetchEvents({
        locationAndTitleFilter:this.state.locationAndTitleFilter,
        page: pageNumber,
        limit: this.state.limit
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createEventObj) {
      this.setState({ addSuccessMsg: "event added Successfully" });
      this.setState({ jobarr: nextProps.createEventObj.eventarr });
      this.setState({ perjobarr: nextProps.createEventObj.eventarr });
    } else {
      this.setState({ perjobarr: nextProps.sendobj.perjobarr });
      this.setState({ jobarr: nextProps.sendobj.perjobarr });
      this.setState({ companyobj: nextProps.sendobj.companyobj });
      this.setState({count:nextProps.sendobj.total})
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
      localStorage.setItem("eventId", this.state.id);
      return <Redirect to={`/event/student/${this.state.id}`} />;
    }
  };

  

  handleSubmit = e => {
    e.preventDefault();

    // let config = {
    //   headers: {
    //     Authorization: `${window.localStorage.getItem("company")}`
    //   }
    // };
    let data = {
      event: {
        event_name: this.state.eventtitle,
        date: this.state.date,
        location: this.state.eventlocation,
        event_time: this.state.event_time,
        event_description: this.state.event_description,
        eligibility: this.state.eligibility
      }
    };
    var companyobj = this.state.companyobj;
    var payload = {
      data,
      companyobj
    };
    this.props.createEvent(payload);
    
  };

  render() {
    return (
      <div align="center">
        {this.renderRedirect()}
        <div className="maindiv ">
          <div
            className="style__secondary-nav___3_H_G pb-2 mb-3"
            align="center"
          >
            <h2
              className="ml-5"
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              Event Search
            </h2>
          </div>
        </div>

        <div align="center">
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
                      { locationAndTitleFilter: e.target.value || "empty" },
                      () => {
                        this.getFilterEvents();
                      }
                    );
                     // this.filterByTitleOrCompany(e.target.value);
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
                      this.setState(
                      { locationAndTitleFilter: e.target.value || "empty" },
                      () => {
                        this.getFilterEvents();
                      }
                    );
                      // this.filterByLocation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div></div>
                <div className="p-2 ml-2 mr-4">
                  <button
                    className="btn btn-info"
                    onClick={e => {
                      this.setState({ modalShow: "block" });
                    }}
                  >
                    <ion-icon name="add"></ion-icon>
                    Add Events
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
                          New Event
                        </h3>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Event Title
                          </label>
                          <input
                            type="text"
                            id="eventtitle"
                            name="eventtitle"
                            className="form-control"
                            placeholder="Enter Job Title"
                            onChange={e => {
                              this.setState({ eventtitle: e.target.value });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          ></label>
                          <select
                            value={this.state.eligibility}
                            id="category"
                            className="form-control"
                            onChange={e => {
                              this.setState({ eligibility: e.target.value });
                            }}
                            required
                          >
                            <option value="All">All</option>
                            <option value="CSE">Computer Science</option>
                            <option value="Se">Software Engineer</option>
                            <option value="EE">Electrical Engineer</option>
                            <option value="EM">Engineering Management</option>
                            <option value="IE">Industrial Engineering</option>
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
                              this.setState({ eventlocation: e.target.value });
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
                              Time
                            </label>
                            <input
                              type="time"
                              id="Time"
                              name="Time"
                              className="form-control"
                              placeholder="Eg. 500000"
                              onChange={e => {
                                this.setState({ event_time: e.target.value });
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
                              Date
                            </label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              className="form-control"
                              placeholder="Event Date"
                              onChange={e => {
                                this.setState({
                                  date: e.target.value
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
                            id="event_description"
                            name="event_description"
                            className="form-control"
                            placeholder="Enter Job Description"
                            onChange={e => {
                              this.setState({
                                event_description: e.target.value
                              });
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
                      <div key={i.event_detail_id}>
                        <div
                          className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                          onClick={e => {
                            this.setRedirect(i.event_detail_id);
                            this.setState({ id: i.event_detail_id });
                          }}
                        >
                          <div className="d-flex">
                            <ion-icon name="briefcase"></ion-icon>
                            <h3
                              className="ml-2"
                              style={{ fontSize: "16px", fontWeight: "700" }}
                            >
                              {i.event_name}
                            </h3>
                          </div>
                          <div align="left">
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
                              {i.event_time} PST time
                            </h3>
                            <h3
                              style={{
                                color: "rgba(0,0,0,.56)",
                                fontWeight: "200px",
                                fontSize: "14px"
                              }}
                            >
                              {i.location}
                            </h3>
                          </div>
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
    sendobj: state.companyReducer.eventobj,
    createEventObj: state.companyReducer.createEventObj
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: (payload) => dispatch(fetchEvents(payload)),
    createEvent: payload => dispatch(createEvent(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyEvent);
