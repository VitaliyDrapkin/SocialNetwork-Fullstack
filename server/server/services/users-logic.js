const User = require("../models/user");
const encryption = require("../helper/encryption");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const filesUrls = require("../helper/filesUrls");

async function addUser(data) {
  try {
    //Check if email is not used
    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
      gender: data.gender,
    });
    const response = await user.save();
    const refreshToken = encryption.getRefreshToken(response._id);
    const accessToken = encryption.getAccessToken(response._id);
    addRefreshToken(response._id, refreshToken);
    const responseData = {
      userResponse: {
        _id: response._id,
        accessToken: accessToken,
      },
      refreshToken: refreshToken,
    };
    console.log("New user register");
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
async function login(data) {
  const response = await User.findOne({
    email: data.email,
    password: data.password,
  }).select(["firstName", "lastName", "birthday", "gender", "profileImage"]);
  const refreshToken = encryption.getRefreshToken(response._id);
  const accessToken = await encryption.getAccessToken(response._id);
  addRefreshToken(response._id, refreshToken);
  const responseData = {
    userResponse: {
      _id: response._id,
      firstName: response.firstName,
      lastName: response.lastName,
      birthday: response.birthday,
      gender: response.gender,
      accessToken: accessToken,
      profileImg: (response.profileImage = filesUrls.getCorrectUrl(
        response.profileImage
      )),
    },
    refreshToken: refreshToken,
  };
  return responseData;
}

async function logout(refreshToken) {
  await User.findOneAndUpdate(
    {
      refreshToken: refreshToken,
    },
    { refreshToken: "" }
  );
  return;
}

async function addRefreshToken(userId, token) {
  await User.findByIdAndUpdate(userId, {
    refreshToken: token,
  });
}

async function refreshTokens(oldRefreshToken) {
  const decodeData = encryption.decryptToken(oldRefreshToken);
  const userId = decodeData.data;
  const newRefreshToken = encryption.getRefreshToken(userId);
  const accessToken = await encryption.getAccessToken(userId);
  const update = await User.findOneAndUpdate(
    { _id: userId, refreshToken: oldRefreshToken },
    {
      refreshToken: newRefreshToken,
    }
  );
  if (!update) {
    throw error; //no refresh
  }
  const responseData = {
    userResponse: accessToken,
    refreshToken: newRefreshToken,
  };
  return responseData;
}

async function autoLogin(refreshToken) {
  const decodeData = encryption.decryptToken(refreshToken);
  const userId = decodeData.data;
  const newRefreshToken = encryption.getRefreshToken(userId);
  const accessToken = await encryption.getAccessToken(userId);
  const user = await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: newRefreshToken,
    }
  );
  if (!user) {
    throw new ServerError(ErrorType.REFRESH_TOKEN_ERROR);
  }
  const responseData = {
    userResponse: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      gender: user.gender,
      accessToken: accessToken,
      profileImg: filesUrls.getCorrectUrl(user.profileImage),
    },
    refreshToken: newRefreshToken,
  };
  return responseData;
}
module.exports = {
  addUser,
  login,
  logout,
  refreshTokens,
  autoLogin,
};
