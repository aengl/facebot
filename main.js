const express = require('express');
const {Facebook, FacebookApiException} = require('fb');

require('dotenv').config();

const app = express();
app.use(express.static('public'))

const fb = new Facebook({});

function succeeded(res) {
  if (!res) {
    console.error('unknown error');
  } else if (res.error) {
    console.error('error:', res.error);
  } else {
    return true;
  }
}

// fb.setAccessToken('...');

// fb.api('oauth/access_token', {
//   client_id: process.env.FB_APP_ID,
//   client_secret: process.env.FB_APP_SECRET,
//     grant_type: 'fb_exchange_token',
//     fb_exchange_token: '...'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
//     var accessToken = res.access_token;
//     var expires = res.expires ? res.expires : 0;
// });

// fb.api(`/v2.8/${process.env.FB_GROUP_ID}/feed`, res => {
//   if (succeeded(res)) {
//     console.log(res);
//   }
// });

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
