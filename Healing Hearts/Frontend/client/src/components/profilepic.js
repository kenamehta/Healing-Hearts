import React, { Component } from "react";
import "../styles/profilepic.css";
import { updateName, getEducation } from "../redux/actions/profileAction";
import { connect } from "react-redux";
import axios from "axios";
import api_route from "../app-config";
// import {downloadFileRequest} from '../utils/downloadFilerequest';
// import fileSaver from 'utils/fileSaver';


class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveflag: false,
      newName: "",
      temp: "",
      dataarr: [],
      picture:'',
      propicture:''
    };
  }
//  async componentDidMount() {


//     //  axios.get(`${api_route.host}/student/picture`) .then(res=> 
//     //   {
//     //     console.log('getting picture data from backend',res.data.data.profile_picture);
        
    
//     //     var src=`${api_route.host}//res.data.data.profile_picture`
//     //     console.log(src)
//     //     this.setState({propicture:src})
        
//     //   }).catch(err=>{
//     //     console.log(err)
//     //   })
    
   

//     console.log("getting education in mount");
//   //  this.props.getEducation();
//     let config = {
//       headers: {
//         Authorization: `${window.localStorage.getItem("student")}`
//       }
//     };
//     console.log("mounting in profile------------");
//     try {
//       console.log("In try bloc");
//       axios
//         .get(`${api_route.host}/student/`, config)
//         .then(res => {
//           console.log(res.data);
//           this.setState({ dataarr: res.data });
//           if(res.data.student.profile_picture){
//           var src=`${api_route.host}//${res.data.student.profile_picture}`
//           this.setState({propicture:src})
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   }
  


  handleEdit = async () => {
    console.log(this.state.temp)
    await this.props.updateName(this.state.temp);
    // let tempobj=this.state.dataarr
    // tempobj.student.name=this.state.temp
    // this.setState({dataarr:tempobj})
   // this.setState({ newName: this.state.temp });
    //this.editAfterName();
  };

  updatePic=(e)=>{
    e.preventDefault();
    this.props.updateProfilePic(this.state.picture)
   
  }


  render() {
    const show = this.state.saveflag ? "show" : "";
    const showbutton = this.state.saveflag ? "" : "show";
    const data = this.state.dataarr;
   
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-offset-1 shadow_style">
            <div className="card">
              <div align="center" className="mt-2">
              
              {this.props.profile?
              this.props.profile.profile_picture?
              <div className="style__edit-photo___B-_os">
              <img src={this.props.profile.profile_picture}/>
              </div>
              :
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
                   
                    <input style={{ color: "#1569e0", fontSize: "13px" }} type='file' name='file' onChange={e=>{
                      console.log(e.target.files[0])
              this.setState({picture:e.target.files[0]})
            }} ></input>
                   
                  </div>
                   
                </button>
                </div>

                <input style={{ fontSize: "10px" }} type='submit' className='btn btn-primary mt-3' value='Edit Pic'></input>
                 
                </form>:''
                }
              </div>

              <div className="card-body " align="center">
                {this.props.profile? (
                  
                  <div>
               
                    <h4
                      className="card-title"
                      style={{ fontSize: "24px", fontWeight: "500" }}
                    >
                      {this.props.profile ?this.props.profile.name : ""}
                    </h4>
                   
                    <div className={"collapse navbar-collapse " + showbutton}>
                      <button
                        className="btn btn-primary"
                        onClick={e => {
                          this.setState({ saveflag: true });
                        }}
                      >
                        Edit info
                      </button>
                    </div>
                    <div className={"collapse navbar-collapse " + show}>
                      <input
                        type="text"
                        placeholder={data.student?data.student.name:''}
                        onChange={e => {
                          this.setState({ temp: e.target.value });
                        }}
                      ></input>
                      <button
                        className="btn btn-primary"
                        onClick={e => {
                          this.handleEdit();
                          this.setState({ saveflag: false });
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePic
