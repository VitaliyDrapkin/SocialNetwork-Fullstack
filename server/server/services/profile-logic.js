const User = require("../models/user");
const encryption = require("../helper/encryption");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const filesUrls = require("../helper/filesUrls");
const postsLogic = require("./posts-logic");

async function getProfile(userId) {
  try {
    const profileResponse = await User.findById(userId).select([
      "firstName",
      "lastName",
      "profileImage",
      "status",
      "birthday",
      "relationship",
      "relationshipUser",
      "address",
    ]);
    if (profileResponse.profileImage) {
      profileResponse.profileImage = filesUrls.getCorrectUrl(
        profileResponse.profileImage
      );
    }
    const posts = await postsLogic.getAll(null, userId);
    const responseWithPosts = { ...profileResponse._doc, posts: posts };
    return responseWithPosts;
  } catch (error) {
    console.log(error);
  }
}
async function editImage(bearerToken, imgUrl) {
  const userId = encryption.bearerTokenToUserId(bearerToken);
  try {
    const update = await User.findByIdAndUpdate(userId, {
      profileImage: imgUrl,
    });
    if (!update) {
      console.log("ERRRRRORRRR"); //throw error
    }
    return "profile image updated";
  } catch (error) {
    console.log(error);
  }
}

async function editStatus(bearerToken, status) {
  const userId = encryption.bearerTokenToUserId(bearerToken);
  try {
    const update = await User.findByIdAndUpdate(userId, {
      status: status,
    });
    if (!update) {
      console.log("ERRRRRORRRR"); //throw error
    }
    return "profile image updated";
  } catch (error) {
    console.log(error);
  }
}

async function editLives(bearerToken, lives) {
  const userId = encryption.bearerTokenToUserId(bearerToken);
  console.log(lives);
  try {
    const update = await User.findByIdAndUpdate(userId, {
      address: lives,
    });
    if (!update) {
      console.log("ERRRRRORRRR"); //throw error
    }
    return "profile image updated";
  } catch (error) {
    console.log(error);
  }
}

async function editBirthday(bearerToken, birthday) {
  const userId = encryption.bearerTokenToUserId(bearerToken);
  try {
    const update = await User.findByIdAndUpdate(userId, {
      birthday: birthday,
    });
    if (!update) {
      console.log("ERRRRRORRRR"); //throw error
    }
    return "profile image updated";
  } catch (error) {
    console.log(error);
  }
}
async function editRelationship(bearerToken, relationship) {
  const userId = encryption.bearerTokenToUserId(bearerToken);
  try {
    const update = await User.findByIdAndUpdate(userId, {
      relationship: relationship,
    });
    if (!update) {
      console.log("ERRRRRORRRR"); //throw error
    }
    return "profile image updated";
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getProfile,
  editImage,
  editStatus,
  editLives,
  editBirthday,
  editRelationship,
};
