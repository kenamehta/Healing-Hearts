import React, { Component } from "react";
import axios from 'axios'
import api_route from '../app-config';

class PersonalInfo extends Component {
  state = {
      showInfo:"block",
      editInfo:'none',
      email:'',
      dob:'',
      country:'',
      studentstate:'',
      city:'',
      phone:''
  };

  componentDidMount()
  {
   
  }

    submitDetails()
    {

      let data = {
        basicdetails: {
          email: this.state.email,
          dob: this.state.dob,
          country: this.state.country,
          city: this.state.city,
          studentstate: this.state.studentstate,
          phone: this.state.phone
        }
      };
      this.props.addBasic(data);
      
    }
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-md-offset-1 shadow_style">
            <div className="card">
              <div className="m-3 d-flex justify-content-between">
                <h2 style={{ fontSize: "20px", fontWeight: "500" }}>
                  Personal Information
                </h2>
                <button onClick={(e)=>{
                    this.setState({showInfo:'none',editInfo:'block'})
                }}>
                <ion-icon name="create-outline" style={{fontSize:'20px'}}></ion-icon>
                </button>
              </div>
              <div className='p-2'>
              <div className='d-flex justify-content-between'>
             <h4 className="mt-4 ml-2" style={{fontSize:'18px',fontWeight:'600'}}>Email Address</h4>
            <div  style={{display:this.state.showInfo}}>
             <h4 className="ml-5 mr-2 mt-4"  style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.email:''}</h4>
             </div>
            <input  style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.email:''} onChange={e=>{
                this.setState({email:e.target.value})
            }} required></input>
             </div>

                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  Date Of Birth</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.dob?this.props.personalData.dob.split("T")[0]:'':''}</h4>
              </div>
                 <input  style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.dob:''} onChange={e=>{
                this.setState({dob:e.target.value})
            }}></input>
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  Country</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.country:''}</h4>
                </div>
                 <input style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.country:''} onChange={e=>{
                this.setState({country:e.target.value})
            }}></input>
                 </div>
            
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  State</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.state:''}</h4>
                </div>
                 <input style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.state:''} onChange={e=>{
                this.setState({studentstate:e.target.value})
            }}></input>
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  City</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2 ml-5" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.city:''}</h4>
                </div>
                 <input style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.city:''} onChange={e=>{
                this.setState({city:e.target.value})
            }}></input>
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>Phone </h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2 ml-5" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.phone:''}</h4>
                </div>
                 <input  style={{display:this.state.editInfo }} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.phone:''} onChange={e=>{
                this.setState({phone:e.target.value})
            }}></input>
                 </div>
                 <button className='btn btn-success m-2' align='center' style={{display:this.state.editInfo}} onClick={e=>{
                     this.setState({editInfo:'none',showInfo:'block'})
                     this.submitDetails()
                 }}> Submit</button>
                 
                 
            

            
             </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
