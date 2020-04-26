import React, { Component } from "react";
import "../../styles/message.css";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/actions/messageAction";
class Chat extends Component {
  state = {
    loginId: localStorage.getItem("loginId"),
    showSendButton: "none",
    sendMessage: "",
    receiverModel: "",
    senderModel: "",
    message: ""
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    this.setState({ message: nextProps.message });

    if (nextProps.newmessage) {
      var tempobj = this.state.message;
      tempobj.MessageArray.push(nextProps.newmessage);
      this.setState({ message: tempobj });
     
    }
  }

  sendMessage = () => {
 var receiverModel,senderModel
    if (this.state.message.Receiver.name) {
      this.setState({ receiverModel: "student" });
      receiverModel="student"
      
    } else {
      this.setState({ receiverModel: "company" });
      receiverModel="company"
    }
    if (localStorage.getItem("student")) {
      this.setState({ senderModel: "student" });
      senderModel= "student"
    } else {
      this.setState({ senderModel: "company" });
      senderModel= "company"
    }
    let receiverId = this.state.message.Receiver._id;
    let data = {
      receiverModel: receiverModel,
      senderModel: senderModel,
      receiverId,
      body: this.state.sendMessage
    };
    this.props.sendMessage(data);
  };

  render() {
    return (
      <div>
        {this.state.message.Receiver ? (
          <div className="card" style={{ height: "500px" }}>
            <div className="style__jobs___3seWY">
              <div>
                <div align="center" className="style__topBar___1iT35 mb-3">
                  <h3 style={{ fontWeight: "500", fontSize: "22px" }}>
                    {this.state.message.Receiver.name
                      ? this.state.message.Receiver.name
                      : this.state.message.Receiver.company_name}
                  </h3>
                  <h3 style={{ fontWeight: "500", fontSize: "16px" }}>
                    {this.state.message.Receiver.name
                      ? this.state.message.Receiver.college
                      : this.state.message.Receiver.location}
                  </h3>
                </div>
                <div className="d-flex flex-column">
                  {this.state.message.MessageArray.map(i =>
                    i.senderId == this.state.loginId ? (
                      <div
                        
                        align="right"
                      >
                        <span className="style__message___16Jw41 mb-3">{i.Body}</span>
                      </div>
                    ) : (
                      <div
                        
                        
                        align="left"
                      >
                       <span className="style__message___16Jw4 mb-3" style={{ backgroundColor: "#f7f7f7" }}> {i.Body}</span>
                      </div>
                    )
                  )}
                  <div className="style__topBar___1iT35 mb-3"></div>
                </div>
              </div>
            </div>
            <div className="mb-3 d-flex">
              <textarea
                row="4"
                id="text"
                placeholder="Enter your message here..."
                onClick={e => {
                  this.setState({ showSendButton: "block" });
                }}
                onChange={e => {
                  this.setState({ sendMessage: e.target.value });
                }}
                className="form-control bottom"
              ></textarea>

              <button
                className=" btn btn-primary bottom_button p-2"
                style={{ display: this.state.showSendButton }}
                onClick={e => {
                  this.sendMessage();
                  document.getElementById("text").value ="";
                  this.setState({ showSendButton: "none" });

                }}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.messageReducer);
  return {
    newmessage: state.messageReducer.newmessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: payload => dispatch(sendMessage(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
