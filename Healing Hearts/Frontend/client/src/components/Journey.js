import React, { Component } from "react";
import "../styles/journey.css";
import axios from "axios";
import api_route from "../app-config";
class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveflag: false,
      value: "",
      journeyvalue: ""
    };
  }
  componentDidMount() {
    // console.log("in journey mount before api call")
    // let config = {
    //   headers: {
    //     Authorization: `${window.localStorage.getItem("student")}`,
    //   }
    // }
    // axios.get(`${api_route.host}/student/journey`,config)
    // .then((res)=>{
    //   console.log("getting journey")
    //   console.log(res.data.result)
    // this.setState({journeyvalue:res.data.result})
    // })
    // .catch((err)=>
    // {
    //   console.log(err)
    // })
  }
  handleSubmit = () => {
    this.props.updateCareerObjective(this.state.value);

    //     headers: {
    //       Authorization: `${window.localStorage.getItem("student")}`,
    //     }
    //   }
    //   let data={
    //     student:{
    //       career_objective:this.state.value
    //     }

    // }
    //   axios.post(`${api_route.host}/student/journey`,data,config)
    //   .then((res)=>{
    //     this.setState({journeyvalue:this.state.value})
    //   })
    //   .catch((err)=>
    //   {
    //     console.log(err)
  };

  render() {
    const show = this.state.saveflag ? "show" : "";
    return (
      <div className="container mt-3 p-2 pb-5" style={{ width: "100%" }}>
        <div className="card jshadow">
          <div className="card-body">
            <h4
              className="card-title"
              style={{ fontSize: "18px", fontWeight: "500" }}
            >
              About:{" "}
            </h4>
            <h6 className="card-subtitle mt-1 mb-2 text-muted" />
            <p
              className="card-text"
              style={{ color: "#1569e0", fontSize: "14px" }}
            />
            <p className="card-text" style={{ fontSize: "14px" }}>
              {this.props.journeyData ? (
                this.props.journeyData.career_objective
              ) : (
                ""
              )}
            </p>
            <textarea
              name="bio"
              placeholder="Type your introduction..."
              rows="1"
              type="textarea"
              id="journey-field"
              className="form-control"
              onClick={e => {
                this.setState({ saveflag: true });
              }}
              onChange={e => {
                this.setState({ value: e.target.value });
              }}
            />
            <div
              align="right"
              id="save"
              className={"collapse navbar-collapse " + show}
              style={{ marginTop: "20px" }}
            >
              <button
                className="btn btn-primary"
                onClick={e => {
                  document.getElementById("journey-field").value = "";
                  this.handleSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Journey;
