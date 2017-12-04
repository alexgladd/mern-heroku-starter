// implement github oauth flow
const fetch = require('node-fetch');
const { User } = require('../../models');
const state = require('../../state');
const generateToken = require('./jwt');

const ghHeaders = () => ({ 'Accept': 'application/json' });

const ghConfig = {
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
};

exports.authenticate = async (req, res) => {
  const code = req.body.code;

  try {
    const tokenData = await getAccessToken(code);
    if (!tokenData || !tokenData.access_token) {
      const err = { errorMessage: 'Could not get github access token' };
      throw err;
    }

    const profileData = await getProfile(tokenData.access_token);
    if (!profileData) {
      const err = { errorMessage: 'Could not get github profile data' };
      throw err;
    }

    let user = await User.findOne({ 'github.id': profileData.id }).exec();
    if (!user) {
      user = new User({
        name: profileData.name,
        github: {
          id: profileData.id,
          profileUrl: profileData.html_url,
          avatarUrl: profileData.avatar_url,
        }
      });

      user = await user.save();
    }

    const userResponse = user.toUserResponse();
    const token = generateToken(userResponse);

    res.status(201).json({ ...userResponse, token });
  } catch(err) {
    console.error('Github authentication error', err);
    res.status(500).json(err);
  }
}

const getAccessToken = async (code) => {
  const init = {
    method: 'POST',
    headers: ghHeaders()
  };

  const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${ghConfig.id}&client_secret=${ghConfig.secret}&code=${code}&state=${state.random}`, init);
  return await response.json();
}

const getProfile = async (accessToken) => {
  const headers = Object.assign({}, ghHeaders(), { 'Authorization': `token ${accessToken}` });
  const init = { headers };

  const response = await fetch('https://api.github.com/user', init);
  return await response.json();
}
