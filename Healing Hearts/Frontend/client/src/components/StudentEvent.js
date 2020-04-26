import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EventDescription from "./EventDescription";
import axios from "axios";
import api_route from "../app-config";
import Pagination from "react-js-pagination";

import {
  getEvents,
  fetchRegisteredEvents
} from "../redux/actions/jobAndEventAction";
import "../styles/jobs.css";
class StudentEvent extends Component {
  state = {
    eventobj: "",
    perEventArr: [],
    eventArr: [],
    isRegister: false,
    locationAndTitleFilter: "empty",
    page: "1",
    limit: "10",
    count: ""
  };

  componentWillMount() {
    this.props.getEvents({
      locationAndTitleFilter: this.state.locationAndTitleFilter,
      page: this.state.page,
      limit: this.state.limit
    });
    //this.props.fetchRegisteredEvents()
  }
  getFilterEvents = () => {
    this.props.getEvents({
      locationAndTitleFilter: this.state.locationAndTitleFilter,
      page: this.state.page,
      limit: this.state.limit
    });
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState(
      { page: pageNumber },
      this.props.getEvents({
        locationAndTitleFilter: this.state.locationAndTitleFilter,
        page: pageNumber,
        limit: this.state.limit
      })
    )
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.tempEventArr) {
      this.setState({ eventArr: nextProps.tempEventArr });
    } else {
      this.setState({ eventArr: nextProps.eventArr });
      this.setState({ perEventArr: nextProps.eventArr });
      this.setState({ eventobj: nextProps.eventArr[0] });
      this.setState({count:nextProps.total})
    }
  }

  

  getRegisteredEvents = () => {
    this.props.fetchRegisteredEvents();
  };

  isRegistered = eventId => {
    let data = {
      event: {
        event_id: eventId
      }
    };

    let config = {
      headers: {
        Authorization: `${window.localStorage.getItem("student")}`
      }
    };
    try {
      const pr = axios
        .post(`${api_route.host}/events/isregistered`, data, config)
        .then(res => {
          this.setState({ isRegister: res.data.result.registered });
          // this.setState({ perEventArr: res.data.result });
          // this.setState({eventobj:res.data.result[0]})
          console.log(res.data.result);
          return true;
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  render() {
    //   console.log(this.props.authStudent)
    if (!localStorage.getItem("student")) {
      return <Redirect to="/student/login" />;
    }
    return (
      <div className="maindiv ">
        <div className="style__secondary-nav___3_H_G pb-2 mb-3" align="center">
          <h2 className="ml-5" style={{ fontSize: "20px", fontWeight: "600" }}>
            Event Search
          </h2>
        </div>
        <div className="container mt-3">
          <div className="card">
            <div className="card-body d-flex ">
              <div className="d-flex col-9">
                <div
                  className="m-2"
                  style={{ left: "40px", position: "relative" }}
                >
                  <ion-icon name="search"></ion-icon>
                </div>
                <input
                  type="text"
                  className="form-control p-2 pl-5"
                  placeholder="Event titles or locations"
                  onChange={e => {
                    // this.filterByTitleOrLocation(e.target.value)
                    this.setState(
                      { locationAndTitleFilter: e.target.value || "empty" },
                      () => {
                        this.getFilterEvents();
                      }
                    );
                  }}
                />
              </div>
              <div className="d-flex ml-1">
                <button
                  className="style__pill___3uHDM"
                  onClick={e => {
                    this.getRegisteredEvents();
                  }}
                >
                  Registered Events
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row mt-3">
            <div className="col-5">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <h4
                    className="m-2"
                    style={{ fontWeight: "200px", fontSize: "18px" }}
                  >
                    {" "}
                    All the upcoming events are shown here
                  </h4>
                  {this.state.eventArr
                    ? this.state.eventArr.map(i => (
                        <div key={i._id}>
                          <div
                            className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                            onClick={async e => {
                              let data = {
                                event: {
                                  event_id: i._id
                                }
                              };

                              let config = {
                                headers: {
                                  Authorization: `${window.localStorage.getItem(
                                    "student"
                                  )}`
                                }
                              };
                              try {
                                const pr = axios
                                  .post(
                                    `${api_route.host}/events/isregistered`,
                                    data,
                                    config
                                  )
                                  .then(res => {
                                    this.setState({
                                      isRegister: res.data.result.registered
                                    });

                                    i = Object.assign(i, {
                                      isRegister: this.state.isRegister
                                    });
                                    i = Object.assign(i, {
                                      showButton: "block"
                                    });
                                    console.log(i);

                                    console.log(res.data.result);
                                    this.setState({ eventobj: i });
                                  })
                                  .catch(err => {
                                    console.log(err);
                                    this.setState({ eventobj: i });
                                  });
                              } catch (err) {
                                console.log(err);
                                this.setState({ eventobj: i });
                              }
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
                              {i.location}{" "}
                            </h3>
                          </div>
                        </div>
                      ))
                    : ""}
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
            <div className="col-7">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <EventDescription eventdata={this.state.eventobj} />
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
    eventArr: state.jobReducer.eventArr,
    tempEventArr: state.jobReducer.tempEventArr,
    total:state.jobReducer.total
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvents: payload => dispatch(getEvents(payload)),
    fetchRegisteredEvents: () => dispatch(fetchRegisteredEvents())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentEvent);
