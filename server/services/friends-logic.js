const User = require("../models/user");
const encryption = require("../helper/encryption");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const filesUrls = require("../helper/filesUrls");

async function getFriendsData(bearerToken, userId) {
  try {
    if (!userId) {
      userId = encryption.bearerTokenToUserId(bearerToken);
    }
    const response = await User.findById(userId)
      .select([
        "friends",
        "friendshipRequestsSent",
        "friendshipRequestsReceived",
      ])
      .populate("friends", ["firstName", "lastName", "profileImage", "status"])
      .populate("friendshipRequestsSent", [
        "firstName",
        "lastName",
        "profileImage",
        "status",
      ])
      .populate("friendshipRequestsReceived", [
        "firstName",
        "lastName",
        "profileImage",
        "status",
      ]);

    const friends = response.friends.map((friend) => {
      const clone = JSON.parse(JSON.stringify(friend));
      clone.profileImage = filesUrls.getCorrectUrl(friend.profileImage);
      return clone;
    });
    const friendsRequestSent = response.friendshipRequestsSent.map((friend) => {
      const clone = JSON.parse(JSON.stringify(friend));
      clone.profileImage = filesUrls.getCorrectUrl(friend.profileImage);
      return clone;
    });
    const friendsRequestReceived = response.friendshipRequestsReceived.map(
      (friend) => {
        const clone = JSON.parse(JSON.stringify(friend));
        clone.profileImage = filesUrls.getCorrectUrl(friend.profileImage);
        return clone;
      }
    );
    return { friends, friendsRequestSent, friendsRequestReceived };
  } catch (error) {
    console.log(error);
  }
}

async function getSearchFriends(filter, start, bearerToken) {
  try {
    const userId = encryption.bearerTokenToUserId(bearerToken);
    const friendsResponse = await User.findById(userId).select([
      "friends",
      "friendshipRequestsSent",
    ]);
    const friendsId = [
      ...friendsResponse.friends,
      ...friendsResponse.friendshipRequestsSent,
    ];
    friendsId.push(userId);
    let firstWord = "";
    let secondWord = "";
    const words = filter.split(" ");
    if (words.length > 0) {
      firstWord = words[0];
    }
    if (words.length > 1) {
      secondWord = words[1];
    }
    const response = await User.find({
      $and: [
        {
          $or: [
            {
              firstName: { $regex: firstWord, $options: "i" },
              lastName: { $regex: secondWord, $options: "i" },
            },
            {
              firstName: { $regex: secondWord, $options: "i" },
              lastName: { $regex: firstWord, $options: "i" },
            },
          ],
        },
        {
          _id: {
            $nin: friendsId,
          },
        },
      ],
    })
      .select(["firstName", "lastName", "profileImage", "status"])
      .skip(+start)
      .limit(5);

    const friends = response.map((friend) => {
      const clone = JSON.parse(JSON.stringify(friend));
      clone.profileImage = filesUrls.getCorrectUrl(friend.profileImage);
      return clone;
    });
    return friends;
  } catch (error) {
    console.log(error);
  }
}

async function sendRequest(userIdReceiver, bearerToken) {
  try {
    const userId = encryption.bearerTokenToUserId(bearerToken);
    const isHasRequest = await User.findOne({
      _id: userId,
      friendshipRequestsReceived: { $in: [userIdReceiver] },
    });
    if (isHasRequest) {
      await User.findOneAndUpdate(
        {
          _id: userId,
          friendshipRequestsReceived: userIdReceiver,
        },
        {
          $push: {
            friends: userIdReceiver,
          },
        }
      );
      await User.findOneAndUpdate(
        {
          _id: userIdReceiver,
          friendshipRequestsSent: userId,
        },
        {
          $push: {
            friends: userId,
          },
        }
      );
      await cancelRequest(userId, "", userIdReceiver);
    } else {
      console.log(isHasRequest);
      await User.findByIdAndUpdate(userId, {
        $push: { friendshipRequestsSent: userIdReceiver },
      });
      await User.findByIdAndUpdate(userIdReceiver, {
        $push: { friendshipRequestsReceived: userId },
      });
    }
    return "success";
  } catch (error) {
    console.log(error);
  }
}

async function cancelRequest(userIdReceiver, bearerToken, userId) {
  try {
    if (!userId) {
      userId = encryption.bearerTokenToUserId(bearerToken);
    }
    await User.updateMany(
      { $or: [{ _id: userId }, { _id: userIdReceiver }] },
      {
        $pull: {
          friendshipRequestsReceived: { $in: [userId, userIdReceiver] },
          friendshipRequestsSent: { $in: [userId, userIdReceiver] },
        },
      },
      { multi: true }
    );

    return "success";
  } catch (error) {
    console.log(error);
  }
}

async function confirmRequest(userIdReceiver, bearerToken) {
  try {
    const userId = encryption.bearerTokenToUserId(bearerToken);
    await User.findOneAndUpdate(
      {
        _id: userId,
        friendshipRequestsReceived: userIdReceiver,
      },
      {
        $push: {
          friends: userIdReceiver,
        },
      }
    );
    await User.findOneAndUpdate(
      {
        _id: userIdReceiver,
        friendshipRequestsSent: userId,
      },
      {
        $push: {
          friends: userId,
        },
      }
    );
    await cancelRequest(userId, "", userIdReceiver);
    return "success";
  } catch (error) {
    console.log(error);
  }
}

async function removeFriend(friendId, bearerToken) {
  try {
    const userId = encryption.bearerTokenToUserId(bearerToken);
    await User.findByIdAndUpdate(userId, {
      $pull: {
        friends: friendId,
      },
    });
    await User.findByIdAndUpdate(friendId, {
      $pull: {
        friends: userId,
      },
    });
    return "success";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getFriendsData,
  getSearchFriends,
  sendRequest,
  cancelRequest,
  confirmRequest,
  removeFriend,
};
