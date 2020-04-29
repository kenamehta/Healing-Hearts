import React, { Component } from "react";
import { connect } from "react-redux";
import { getMessages,sendMessage } from "../../redux/actions/messageAction";
import api_route from "../../app-config";
import Chat from "./Chat"
import "../../styles/message.css";
class Message extends Component {
  state = {
    messageobj:'',
    messageArr:[],
    newmessage:'empty'
  };
  componentWillMount(){
      this.props.getMessages();
  }
  componentWillReceiveProps(nextProps){
      console.log(nextProps)
     // var src = `${api_route.host}//${res.data.name}`;
    this.setState({messageArr:nextProps.messageArr},()=>{
        console.log(this.state.messageArr)
    })
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-3">
            <div className="col-4">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <h4
                    className="m-2"
                    style={{ fontWeight: "200px", fontSize: "18px" }}
                  >
                    {" "}
                    Messages{" "}
                  </h4>
                 
                  {this.state.messageArr
                    ? this.state.messageArr.map(i => (
                        <div key={i._id}>
                          <div
                            className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                            onClick={e => {
                              this.setState({ messageobj: i });
                            }}
                          >
                            <div className="d-flex">
                            <img src={i.Receiver.profilePic?`${api_route.host}//${i.Receiver.profilePic}`:`${api_route.host}//${i.Receiver.profilepicaddress}`} height="50" width="50"></img>
                            <div>
                              <h3
                                className="ml-2"
                                style={{ fontSize: "16px", fontWeight: "700" }}
                              >
                                {i.Receiver.name?i.Receiver.name:i.Receiver.companyName}
                               
                              </h3>
                              <h3
                                className="ml-2"
                                style={{ fontSize: "16px", fontWeight: "500" }}
                              >
                                {i.Receiver.name?i.Receiver.title:i.Receiver.location}
                               
                              </h3>
                             </div>
 
                            </div>

                            <h3 style={{ fontSize: "16px", fontWeight: "400" }}>
                            </h3>

                            <h3
                              style={{
                                color: "rgba(0,0,0,.56)",
                                fontWeight: "200px",
                                fontSize: "14px"
                              }}
                            >
                              {i.MessageArray.slice(-1)[0].Body.substring(0,40)?i.MessageArray.slice(-1)[0].Body.substring(0,40):i.MessageArray.slice(-1)[0].Body}... 
                            </h3>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
            <div className="col-8">
              
                  <Chat newmessage={this.state.newmessage} message={this.state.messageobj} />
               
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state);
    return {
      messageArr:state.messageReducer.messageArr||' '
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      getMessages: ()=> dispatch(getMessages()),
     // sendMessage: (payload)=> dispatch(sendMessage(payload))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Message);
