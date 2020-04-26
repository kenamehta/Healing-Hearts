import React, { Component } from "react";
import axios from 'axios'
import api_route from '../../app-config';

class VisitedPersonalInfo extends Component {
  state = {
     
  };

 
  
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
               
              </div>
              <div className='p-2'>
              <div className='d-flex justify-content-between'>
             <h4 className="mt-4 ml-2" style={{fontSize:'18px',fontWeight:'600'}}>Email Address</h4>
            <div  style={{display:this.state.showInfo}}>
             <h4 className="ml-5 mr-2 mt-4"  style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.email:''}</h4>
             </div>
            
             </div>

                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  Date Of Birth</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.dob:''}</h4>
              </div>
                
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  Country</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.country:''}</h4>
                </div>
                
                 </div>
            
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  State</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.state:''}</h4>
                </div>
               
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  City</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2 ml-5" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.city:''}</h4>
                </div>
                
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>Phone </h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2 ml-5" style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.phone_number:''}</h4>
                </div>
                 
                 </div>
                 {/* <button className='btn btn-success m-2' align='center' style={{display:this.state.editInfo}} onClick={e=>{
                     this.setState({editInfo:'none',showInfo:'block'})
                     this.submitDetails()
                 }}> Submit</button> */}
                 
                 
            

            
             </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VisitedPersonalInfo;
