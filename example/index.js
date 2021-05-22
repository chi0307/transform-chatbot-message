require('dotenv').config();
const { transformToLineMessage, transformToFacebookMessage } = require('@chi0307/transform-chatbot-message');
const axios = require('axios');

const LINE_TOKEN = process.env.LINE_TOKEN;
const LINE_USER_ID = process.env.LINE_USER_ID;
const FB_SENDER_PSID = process.env.FB_SENDER_PSID;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

let imageUrl = 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg';
let videoUrl = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
let audioUrl = 'https://cloud.google.com/text-to-speech/docs/audio/cmn-TW-Standard-B.wav';

const actions = [
  {
    type: 'postback',
    title: '測試回覆訊息',
    data: 'test',
  },
  {
    type: 'url',
    title: '打開網址',
    url: 'https://www.google.com',
  },
  {
    type: 'phone',
    title: '打電話',
    number: '+886912345678',
  },
];

const textMessage = {
  type: 'text',
  text: '測試訊息',
};

const imageMessage = {
  type: 'image',
  imageUrl: imageUrl,
  previewImageUrl: imageUrl,
};

const audioMessage = {
  type: 'audio',
  audioUrl: audioUrl,
  duration: 5000,
};

const videoMessage = {
  type: 'video',
  videoUrl: videoUrl,
  previewImageUrl: imageUrl,
};

const buttonMessage = {
  type: 'button',
  altText: '範本訊息',
  text: '按鈕訊息',
  buttons: actions,
};

const carouselMessage = {
  type: 'carousel',
  altText: '範本訊息',
  columns: [
    {
      title: 'Title 1',
      text: 'Text 1',
      imageUrl: imageUrl,
      buttons: actions,
    },
    {
      title: 'Title 2',
      text: 'Text 2',
      imageUrl: imageUrl,
      buttons: actions,
    },
  ],
};

function pushLineMessage(message) {
  let lineMessage = transformToLineMessage(message);
  const config = {
    method: 'post',
    url: 'https://api.line.me/v2/bot/message/push',
    headers: {
      Authorization: LINE_TOKEN,
      'Content-Type': 'application/json',
    },
    data: {
      to: LINE_USER_ID,
      messages: [lineMessage],
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}

function pushFacebookMessage(message) {
  let facebookMessage = transformToFacebookMessage(message);
  const config = {
    method: 'post',
    url: `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_PAGE_ACCESS_TOKEN}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      recipient: {
        id: FB_SENDER_PSID,
      },
      message: facebookMessage,
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}

pushLineMessage(textMessage);
