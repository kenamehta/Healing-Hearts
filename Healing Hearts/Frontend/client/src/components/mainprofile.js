import React, { Component } from "react";
import ProfilePic from "./profilepic";
import PersonalInfo from "./PersonalInfo";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Journey from "./Journey";
import Education from "./Education";
import Experience from "./experience";
import Skills from "./skills";
import {
  getProfile,
  updateName,
  updateProfilePic,
  updateCareerObjective,
  updateEducation,
  addEducation,
  deleteEducation,
  updateExperience,
  deleteExperience,
  addExperience,
  addSkill,
  removeSkill,
  addBasic
} from "../redux/actions/profileAction";

class MainProfile extends Component {
  state = {};
  componentWillMount() {
    this.props.getProfile();
  }
  render() {
    if (!localStorage.getItem("student")) {
      return <Redirect to="/student/login" />;
    } else {
    }
    return (
      <div className="d-flex container">
        <div className="row">
          <div className="col-4">
            <ProfilePic
              profile={this.props.profile}
              updateName={this.props.updateName}
              updateProfilePic={this.props.updateProfilePic}
            />
            <Skills skillData={this.props.profile} addSkill={this.props.addSkill} removeSkill={this.props.removeSkill} />
            <PersonalInfo personalData={this.props.profile} addBasic={this.props.addBasic} />
          </div>
          <div className="col-8">
            <Journey
              journeyData={this.props.profile}
              updateCareerObjective={this.props.updateCareerObjective}
            />
            <Education
              educationData={this.props.profile}
              updateEducation={this.props.updateEducation}
              addEducation={this.props.addEducation}
              deleteEducation={this.props.deleteEducation}
            />

            <Experience
              experienceData={this.props.profile}
              updateExperience={this.props.updateExperience}
              addExperience={this.props.addExperience}
              deleteExperience={this.props.deleteExperience}
            />
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
    getProfile: () => dispatch(getProfile()),
    updateName: payload => dispatch(updateName(payload)),
    updateProfilePic: payload => dispatch(updateProfilePic(payload)),
    updateCareerObjective: payload => dispatch(updateCareerObjective(payload)),
    updateEducation: payload => dispatch(updateEducation(payload)),
    addEducation: payload => dispatch(addEducation(payload)),
    deleteEducation: payload => dispatch(deleteEducation(payload)),
    updateExperience: payload => dispatch(updateExperience(payload)),
    addExperience: payload => dispatch(addExperience(payload)),
    deleteExperience: payload => dispatch(deleteExperience(payload)),
    addSkill: payload => dispatch(addSkill(payload)),
    removeSkill: payload => dispatch(removeSkill(payload)),
    addBasic: payload => dispatch(addBasic(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);