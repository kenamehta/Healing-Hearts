import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginDonor from "./LoginDonor";
import Navbar from "./Navbar";
import LoginEmployer from "./LoginEmployer";
import RegisterCompany from "./RegisterCompany";
import DonorRegister from "./DonorRegister";
import MainProfile from "./mainprofile";
import DonorFundraiser from "./DonorFundraiser";
import DonorHistory from "./DonorHistory";
import DonorList from "./DonorList";
import MainVisitedProfile from "./Profile/MainVisitedProfile";
import CompanyHome from "./company/CompanyHome";
import DonorFundraiserList from "./company/DonorFundraiserList";
import CompanyEvent from "./company/CompanyEvent";
import VisitedCompany from "./company/VisitedCompany.js/VisitedCompany";
import Message from "./message/Message" ;
import Home from "./Home" ;

class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        {/* <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/> */}

        <Route path="/" component={Navbar} />
        <Route path="/donor/login" component={LoginDonor} />
        <Route path="/company/login" component={LoginEmployer} />
        <Route path="/donor/register" component={DonorRegister} />
        <Route path="/company/register" component={RegisterCompany} />
        <Route path="/company/home" component={CompanyHome} />
        <Route path="/donor/home" component={MainProfile} />
        <Route path="/donor/fundraisers" component={DonorFundraiser} />
        <Route path="/donor/history" component={DonorHistory} />
        <Route path="/donor/list" component={DonorList} />
        <Route path="/company/list" component={DonorList} />
        <Route path="/message" component={Message} />
        <Route path="/donor/profile/:id" component={MainVisitedProfile} />
        <Route path="/job/donor/:id" component={DonorFundraiserList} />
        <Route path="/company/events" component={CompanyEvent} />
        <Route path="/visitcompany/home/:id" component={VisitedCompany} />
        <Route path="/home" component={Home} />
        
        {/* <Route path="/" */}
      </div>
    );
  }
}
//Export The Main Component
export default Main;
