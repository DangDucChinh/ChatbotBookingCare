// require('dotenv').config();
// import request from 'request';
// // process.env.NAME_VARIABLE

// let getHomePage = (req, res) => {
//     return res.render('homepage.ejs');
// }

// // let postWebhook = (req, res) => {
// //     let body = req.body;
// //     console.log(`\u{1F7EA} Received webhook:`);
// //     console.dir(body, { depth: null });
// //     if (body.object === "page") {
// //         // Returns a '200 OK' response to all requests
// //         res.status(200).send("EVENT_RECEIVED");
// //         // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
// //       } else {
// //         // Return a '404 Not Found' if event is not from a page subscription
// //         res.sendStatus(404);
// //       }
// // }

// // function handleMessage(sender_psid, received_message){

// // }

// // function handlePostback(sender_psid, received_postback) {

// // }
// // function callSendAPI(sender_psid, response) {}


// // let getWebhook = (req, res) => {
// //     // Parse the query params
// //   let mode = req.query["hub.mode"];
// //   let token = req.query["hub.verify_token"];
// //   let challenge = req.query["hub.challenge"];

// //   let VERIFY_TOKEN = process.env.VERIFY_TOKEN; 

// //   // Check if a token and mode is in the query string of the request
// //   if (mode && token) {
// //     // Check the mode and token sent is correct
// //     if (mode === "subscribe" && token === VERIFY_TOKEN) {
// //       // Respond with the challenge token from the request
// //       console.log("WEBHOOK_VERIFIED");
// //       res.status(200).send(challenge);
// //     } else {
// //       // Respond with '403 Forbidden' if verify tokens do not match
// //       res.sendStatus(403);
// //     }
// //   }
    
// // }
// let postWebhook = (req, res) => {
//   let body = req.body;
//   //new
//   console.log(`\u{1F7EA} Received webhook:`);
//   console.dir(body, { depth: null });
//   // Parse the request body from the POST
//   // Check the webhook event is from a Page subscription
//   if (body.object === 'page') {

//     // Iterate over each entry - there may be multiple if batched
//     body.entry.forEach(function (entry) {

//       // Get the webhook event. entry.messaging is an array, but 
//       // will only ever contain one event, so we get index 0
//       // Gets the body of the webhook event
//       let webhook_event = entry.messaging[0];
//       console.log(webhook_event);

//       // Get the sender PSID
//       let sender_psid = webhook_event.sender.id;
//       console.log('Sender PSID: ' + sender_psid);

//       // Check if the event is a message or postback and
//       // pass the event to the appropriate handler function
//       if (webhook_event.message) {
//         console.log('webhook event 1');
//         handleMessage(sender_psid, webhook_event.message);
//       } else if (webhook_event.postback) {
//         console.log('webhook event 2');

//         handlePostback(sender_psid, webhook_event.postback);
//       }

//     });

//     // Return a '200 OK' response to all events
//     res.status(200).send('EVENT_RECEIVED');

//   } else {
//     // Return a '404 Not Found' if event is not from a page subscription
//     res.sendStatus(404);
//   }
// }

// let getWebhook = (req, res) => {

//   // Your verify token. Should be a random string.
//   let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

//   // Parse the query params
//   let mode = req.query['hub.mode'];
//   let token = req.query['hub.verify_token'];
//   let challenge = req.query['hub.challenge'];

//   // Checks if a token and mode is in the query string of the request
//   if (mode && token) {

//     // Checks the mode and token sent is correct
//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {

//       // Responds with the challenge token from the request
//       console.log('WEBHOOK_VERIFIED');
//       res.status(200).send(challenge);

//     } else {
//       // Responds with '403 Forbidden' if verify tokens do not match
//       res.sendStatus(403);
//     }
//   }
// }

// // function handleMessage(sender_psid, received_message) {

// //   let response;

// //   // Checks if the message contains text
// //   if (received_message.text) {
// //     // Create the payload for a basic text message, which
// //     // will be added to the body of our request to the Send API
// //     response = {
// //       "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
// //     }
// //   } else if (received_message.attachments) {
// //     // Get the URL of the message attachment
// //     let attachment_url = received_message.attachments[0].payload.url;
// //     response = {
// //       "attachment": {
// //         "type": "template",
// //         "payload": {
// //           "template_type": "generic",
// //           "elements": [{
// //             "title": "Is this the right picture?",
// //             "subtitle": "Tap a button to answer.",
// //             "image_url": attachment_url,
// //             "buttons": [
// //               {
// //                 "type": "postback",
// //                 "title": "Yes!",
// //                 "payload": "yes",
// //               },
// //               {
// //                 "type": "postback",
// //                 "title": "No!",
// //                 "payload": "no",
// //               }
// //             ],
// //           }]
// //         }
// //       }
// //     }
// //   }
// //   callSendAPI(sender_psid, response);
// // }

// function handleMessage(sender_psid, received_message) {

//   let response;

//   // Check if the message contains text
//   if (received_message.text) {

//     // Create the payload for a basic text message
//     response = {
//       "text": `You sent the message: "${received_message.text}". Now send me an image!`
//     }
//   }

//   // Sends the response message
//   callSendAPI(sender_psid, response);
// }

// function handlePostback(sender_psid, received_postback) {
//   let response;

//   // Get the payload for the postback
//   let payload = received_postback.payload;

//   // Set the response based on the postback payload
//   if (payload === 'yes') {
//     response = { "text": "Thanks!" }
//   } else if (payload === 'no') {
//     response = { "text": "Oops, try sending another image." }
//   }
//   // Send the message to acknowledge the postback
//   callSendAPI(sender_psid, response);
// }

// function callSendAPI(sender_psid, response) {
//   // Construct the message body
//   let request_body = {
//     "recipient": {
//       "id": sender_psid
//     },
//     "message": response
//   }

//   // Send the HTTP request to the Messenger Platform
//   request({
//     "uri": "https://graph.facebook.com/v2.6/me/messages",
//     "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
//     "method": "POST",
//     "json": request_body
//   }, (err, res, body) => {
//     if (!err) {
//       console.log('message sent!')
//     } else {
//       console.error("Unable to send message:" + err);
//     }
//   });
// }

// module.exports = {
//     getHomePage: getHomePage,
//     postWebhook: postWebhook,
//     getWebhook: getWebhook
// }


require('dotenv').config();
import request from "request";

//process.env.NAME_VARIABLES
let getHomePage = (req, res) => {
  return res.render('homepage.ejs');
};

let postWebhook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}

let getWebhook = (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

// Handles messages events
function handleMessage(sender_psid, received_message) {

  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment! I want to introduce myself because now i am just a robot are created by Dadcy! Welcome!`
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = {
  getHomePage: getHomePage,
  postWebhook: postWebhook,
  getWebhook: getWebhook

}