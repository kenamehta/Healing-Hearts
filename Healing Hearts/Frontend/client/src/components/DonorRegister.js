import React, { Component } from "react";
import { connect } from 'react-redux';
import {registerDonor} from '../redux/actions/authAction'
import { Redirect } from 'react-router-dom';
class DonorRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      schoolname: "",
      password: "",
      confirmpassword: ""
            };
  }
  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state.email,"nfnfdknfdkskd")
    const { password, confirmpassword } = this.state;
    if (password !== confirmpassword) {
      alert("Password doesn't match");
    } else {
        const data = {
            student: {
              email: this.state.email,
              password: this.state.password,
              name:this.state.fullname,
              college:this.state.schoolname
            }
          };
          this.props.registerDonor(data);
    }

    
    
  };
  render() {
    if(this.props.authStudent) {
        return <Redirect to='/student/home' />
    }
    return (
      <div className="row">
        <div className="col-1"></div>
        <div className="col-md-4 col-md-offset-1">
          <h1 style={{ margin: "6px" }}> Join the Healing Hearts community</h1>
          <p style={{ fontSize: "18px", margin: "6px" }}>
           Giving is not just about making a donation, it is about making a difference  
          </p>
          <a style={{ color: "#1569e0",padding:'0px' }} href="/company/register">
            Here to create a fundraiser? Create an account here.
          </a>
        </div>
        <div className="col-1"></div>
        <div
          className="col-md-6 col-md-offset-2"
          style={{ padding: "16px", marginBottom: "20px" }}
        >
          <form onSubmit={this.handleSubmit}>
            
            <div className="form-group col-md-8">
              <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Name
              </label>
              <input
                type="text"
                id="sname"
                name="sname"
                className="form-control"
                placeholder="Enter Your Organization Name"
                onChange={e => {
                        this.setState({ fullname: e.target.value });
                      }}
                      required

              ></input>
            </div>
            <div className="form-group col-md-8">
              <div>
                
                <label style={{ fontWeight: "500", marginBottom: "3px" }}>
                  Email Address
                </label>
              </div>

              <label
                style={{
                  fontWeight: "500",
                  fontSize: "13px",
                  marginBottom: "5px"
                }}
              >
                Please use your work email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="john@doe.edu"
                onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                      required

              ></input>
            </div>
            <div className="col-md-8 d-flex p-0">
              <div className="form-group col-md-6 ">
                <label style={{ fontWeight: "500", marginBottom: "3px" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                      required

                ></input>
              </div>
              <div className="form-group col-md-6">
                <label style={{ fontWeight: "500", marginBottom: "3px" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpass"
                  name="cpass"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={e => {
                        this.setState({ confirmpassword: e.target.value });
                      }}
                      required

                ></input>
              </div>
            </div>
            <div className="form-group col-md-8 m-3">
              <input type="submit" className="btn btn btn-primary"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        authStudent: state.auth.authStudent,
        autherror: state.auth.autherror
       // loginSeller: state.loginReducer.isAuthenticatedSeller
    }   
  }
  const mapDispatchToProps = dispatch => {
      return {
        registerDonor: payload => dispatch(registerDonor(payload))
      };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DonorRegister);
  

