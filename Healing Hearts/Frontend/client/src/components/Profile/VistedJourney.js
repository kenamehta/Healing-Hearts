import React, { Component } from "react";
import '../../styles/journey.css'

class VisitedJourney extends Component {
 constructor(props){
   super(props);
  this.state = {
   
  };
}

  render() {

    

    const show = (this.state.saveflag) ? "show" : "" ;
    return (
      <div className="container mt-3 p-2 pb-5">
        <div className="card jshadow">
          <div className="card-body">
            <h4 className="card-title" style={{fontSize:"18px",fontWeight:"500"}}>My Journey</h4>
            <h6 className="card-subtitle mt-1 mb-2 text-muted"></h6>
            <p className="card-text" style={{color:'#1569e0',fontSize:'14px'}}>
            What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?
            </p>
            <p className="card-text" style={{fontSize:'14px'}}>
            {this.props.journeyData?this.props.journeyData.career_objective:''}
            </p>
            {/* <textarea name="bio" placeholder="Type your introduction..." rows="4" type="textarea" id="journey-field" className="form-control"  onClick={e=>{
              this.setState({saveflag:true}
              )
            }} onChange={e=>{
              this.setState({value:e.target.value})
            }}></textarea> */}
           <div align='right' id="save" className={"collapse navbar-collapse " + show} style={{marginTop:"20px"}}>
            <button className="btn btn-primary" onClick={
              this.handleSubmit
            }>Save</button>
           </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VisitedJourney;
