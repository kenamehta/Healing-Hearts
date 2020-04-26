var express = require("express");
var route = express.Router();
const {Messages} = require("../db/messageModel")
const { generateToken, decryptToken } = require("../service/tokenservice");


route.get("/:id", async (req, res) => {
  var err='',response='';
  try {
    Decryptedtoken = decryptToken(req.headers.authorization);

    const studentArr1 = await Messages.find({
      Sender: req.params.id,
    }).populate("Receiver");
    //console.log(studentArr1)
    const studentArr2 = await Messages.find({
      Receiver: req.params.id,
    }).populate("Sender");

    studentArr2.map((i) => {
      var tempObj = i.Sender;
      i.Sender = i.Receiver;
      i.Receiver = tempObj;
    });
    console.log(studentArr)

    var studentArr = studentArr1.concat(studentArr2);
    console.log(studentArr)

    response.data = studentArr;
    return res.status(201).send(studentArr);
  } catch (error) {
    console.log(error);
    //err.status = 500;
    err.data = {
      errors: {
        body: err,
      },
    };
    return res.status(500).send(err.data);
  }
});
route.post(
  "/:senderId/:receiverId/:senderModel/:receiverModel",
  async (req, res) => {
    let err ='', response = '';
    try {
        console.log(req.body.message)
      Decryptedtoken = decryptToken(req.headers.authorization);
      let messageobj = {
        Body: req.body.message.body,
        senderId: req.params.senderId,
      };
      const getOldChat = await Messages.findOne({
        $and: [
          {
            $or: [
              { Sender: req.params.senderId },
              { Sender: req.params.receiverId },
            ],
          },
          {
            $or: [
              { Receiver: req.params.senderId },
              { Receiver: req.params.receiverId },
            ],
          },
        ],
      });
      console.log(getOldChat+"old chat");
      if (getOldChat) {
        getOldChat.MessageArray.push(messageobj);
        getOldChat.save();
        // const filter = { _id: getOldChat._id };
        // const update = { MessageArray: messageArray };
        // const updateMessageArray = Messages.findOneAndUpdate(filter, update, {
        //   new: true,
        //   useFindAndModify: true
        // });
        response.data = getOldChat;
        //return callback(null, response);
        return res.status(201).send(getOldChat);
      } else {
        // let temparr=[];
        // temparr.push(messageobj)
        const message = await Messages.create({
          Sender: req.params.senderId,
          Receiver: req.params.receiverId,
          SenderModel: req.params.senderModel,
          ReceiverModel: req.params.receiverModel,
          // MessageArray:temparr
        });

        if (message) {
          message.MessageArray.push(messageobj);
          message.save();
          response.data = message;
          return res.status(201).send(message);
        }
      }
    } catch (error) {
      console.log(error);
      err.status = 500;
      err.data = {
        errors: {
          body: err,
        },
      };
      return res.status(500).send(err);
    }
  }
);
module.exports = route;
