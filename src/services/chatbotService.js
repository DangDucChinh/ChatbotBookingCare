require('dotenv').config();
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = "https://hinhdep.khangviet.net/wp-content/uploads/2020/02/Banner-website-ph%C3%B2ng-kh%C3%A1m-website-b%E1%BB%87nh-vi%E1%BB%87n-ng%C3%A0nh-y-t%E1%BA%BF.jpg?v=1582777556";
const IMAGE_GET_STARTED_2 = "https://chatbot-bookingcare.onrender.com/src/images/hinh-xet-nghiem-y-te-khoa-xet-nghiem.jpg";
let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v18.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
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

let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}
let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            // text giới thieu khi get started
            let response1 = { "text": `OK , xin chào mừng bạn ${username} đến với chatbot của chúng tôi` };

            //generic template
            let response2 = await getStartedTemplate();

            // gui 2 tin nhan den cho nguoi dung
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);

            resolve('done');
        } catch (error) {
            reject(error);
        }
    })
}

let getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Xin chào bạn đến với chatbot bookingcare!",
                    "subtitle": "Dưới đây là các lựa chọn: ",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU CHÍNH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "CHUYÊN KHOA Y TẾ",
                            "payload": "SPECIALTIES",
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = await getMainMenuTemplate();

            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (error) {
            reject(error);
        }
    })
}

let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "GIỜ GIẤC ĐẶT LỊCH",
                        "subtitle": "Dưới đây là các lựa chọn: ",
                        "image_url": IMAGE_GET_STARTED_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CA SÁNG 8H - 12H",
                                "payload": "MORNING",
                            },
                            {
                                "type": "postback",
                                "title": "CA CHIỀU 1H - 5H",
                                "payload": "AFTERNOON",
                            },
                            {
                                "type": "postback",
                                "title": "CA NGOÀI GIỜ HÀNH CHÍNH",
                                "payload": "EVENING",
                            }
                        ],
                    },
                    {
                        "title": "Thông tin về các ca làm việc",
                        "subtitle": "Giờ giấc khám bệnh hợp lí",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Bác sĩ",
                                "payload": "DOCTOR",
                            },
                            {
                                "type": "postback",
                                "title": "Chi tiết bác sĩ",
                                "payload": "DETAIL_DOCTOR",
                            },
                        ],
                    },
                    {
                        "title": "CHUYÊN KHOA ĐA DẠNG",
                        "subtitle": "Dưới đây là các lựa chọn: ",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU CHÍNH",
                                "payload": "MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "CHUYÊN KHOA Y TẾ",
                                "payload": "SPECIALTIES",
                            },
                            {
                                "type": "postback",
                                "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                                "payload": "GUIDE_TO_USE",
                            }
                        ],
                    },
                    {
                        "title": "Xin chào bạn đến với chatbot bookingcare!",
                        "subtitle": "Dưới đây là các lựa chọn: ",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU CHÍNH",
                                "payload": "MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "CHUYÊN KHOA Y TẾ",
                                "payload": "SPECIALTIES",
                            },
                            {
                                "type": "postback",
                                "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                                "payload": "GUIDE_TO_USE",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendMainMenu: handleSendMainMenu
}