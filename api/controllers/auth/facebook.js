// implement facebook oauth flow
const fetch = require('node-fetch');
const { User } = require('../../models');
const state = require('../../state');
const generateToken = require('./jwt');

const fbHeaders = () => ({ 'Accept': 'application/json' });

const fbConfig = {
  id: process.env.FACEBOOK_CLIENT_ID,
  secret: process.env.FACEBOOK_CLIENT_SECRET
};

exports.authenticate = async (req, res) => {
  const code = req.body.code;
  const redirectUri = req.body.redirectUri;

  try {
    const tokenData = await getAccessToken(code, redirectUri);
    if (!tokenData || !tokenData.access_token) {
      const err = { errorMessage: 'Could not get facebook access token' };
      throw err;
    }

    const profileData = await getProfile(tokenData.access_token);
    if (!profileData) {
      const err = { errorMessage: 'Could not get facebook profile data' };
      throw err;
    }

    let user = await User.findOne({ 'facebook.id': profileData.id }).exec();
    if (!user) {
      user = new User({
        name: profileData.name,
        facebook: {
          id: profileData.id,
          avatarUrl: profileData.picture.data.url,
        }
      });

      user = await user.save();
    }

    const userResponse = user.toUserResponse();
    const token = generateToken(userResponse);

    res.status(201).json({ ...userResponse, token });
  } catch(err) {
    console.error('Facebook authentication error', err);
    res.status(500).json(err);
  }
}

const getAccessToken = async (code, redirectUri) => {
  const init = {
    method: 'POST',
    headers: fbHeaders()
  };

  const response = await fetch(`https://graph.facebook.com/v2.11/oauth/access_token?client_id=${fbConfig.id}&client_secret=${fbConfig.secret}&redirect_uri=${redirectUri}&code=${code}&state=${state.random}`, init);
  return await response.json();
}

const getProfile = async (accessToken) => {
  const headers = Object.assign({}, fbHeaders(), { 'Authorization': `Bearer ${accessToken}` });
  const init = {
    headers
  };

  const response = await fetch(`https://graph.facebook.com/v2.11/me?fields=id,name,picture`, init);
  return await response.json();
}
