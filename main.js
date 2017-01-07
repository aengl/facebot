const express = require('express');
const {Facebook, FacebookApiException} = require('fb');

require('dotenv').config();

const app = express();
app.use(express.static('public'))

const fb = new Facebook({});
const token = '';

function setToken(t) {
  token = t;
  fb.setAccessToken(token);
}

function succeeded(res) {
  if (!res) {
    console.error('unknown error');
  } else if (res.error) {
    console.error('error:', res.error);
  } else {
    return true;
  }
}

function extendToken() {
  fb.api('oauth/access_token', {
    client_id: process.env.FB_APP_ID,
    client_secret: process.env.FB_APP_SECRET,
      grant_type: 'fb_exchange_token',
      fb_exchange_token: token
  }, res => {
    if (succeeded(res)) {
      console.log('Token was successfully extended!');
      setToken(res.access_token);
    }
  });
}

app.get('/token', (req, res) => {
  if (req.params && req.params.token) {
    setToken(req.params.token);
    console.log('Received token:', token);
    res.send('Thanks!');
    extendToken();
  }
  res.send('No token?!');
})

// fb.api(`/v2.8/${process.env.FB_GROUP_ID}/feed`, res => {
//   if (succeeded(res)) {
//     console.log(res);
//   }
// });

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
