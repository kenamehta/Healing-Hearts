import React, { Component } from "react";
import VisitedProfilePic from "./VisitedProfilePic";
import VisitedPersonalInfo from "./VisitedPersonalInfo";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import VisitedJourney from "./VistedJourney";
import VisitedEducation from "./VisitedEducation";
import VisitedExperience from "./VisitedExperience";
import VisitedSkills from "./VisitedSkills";
// //import {getEducation} from '../redux/actions/profileAction'
import { getProfileSelected } from "../../redux/actions/profileAction";

class MainProfile extends Component {
  state = {};
  componentWillMount() {
    console.log("mounting")
    this.props.getProfileSelected();
  }
  render() {
    // if (!localStorage.getItem("student")) {
    //   return <Redirect to="/student/login" />;
    // } else {
    // }
    return (
      <div className="d-flex container">
        <div className="row">
          <div className="col-4">
            <VisitedProfilePic profile={this.props.profile} />
            <VisitedSkills skillData={this.props.profile} />
            <VisitedPersonalInfo personalData={this.props.profile} />
          </div>
          <div className="col-8">
            <VisitedJourney
              journeyData={this.props.profile}
              //  updateCareerObjective={this.props.updateCareerObjective}
            />
            <VisitedEducation educationData={this.props.profile} />

            <VisitedExperience experienceData={this.props.profile} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    authStudent: state.auth.authStudent,
    profile: state.profileReducer.profile
    // authCompany: state.auth.authCompany
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProfileSelected: () => dispatch(getProfileSelected())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
