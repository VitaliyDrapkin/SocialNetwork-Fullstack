const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const filesLogic = require("./files-Logic");
const encryption = require("../helper/encryption");
const filesUrls = require("../helper/filesUrls");

async function getAll(bearerToken, userId, withFriends) {
  let friendsIds = [];
  if (!userId) {
    userId = encryption.bearerTokenToUserId(bearerToken);
  }
  if (withFriends) {
    const responseFriends = await User.findById(userId).select("friends");
    friendsIds = responseFriends.friends;
  }
  friendsIds.push(userId);
  const posts = await Post.find({ userId: { $in: friendsIds } })
    .sort({ _id: -1 })
    .populate({
      path: "userId",
      select: ["id", "firstName", "lastName", "profileImage"],
    })
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        select: ["id", "firstName", "lastName", "profileImage"],
      },
    });
  const newPosts = posts.map((post) => {
    const clone = JSON.parse(JSON.stringify(post));
    clone.imgUrl = filesUrls.getCorrectUrl(clone.imgUrl);
    clone.userId.profileImage = filesUrls.getCorrectUrl(
      clone.userId.profileImage
    );
    clone.comments = clone.comments.map((comment) => {
      const cloneComment = JSON.parse(JSON.stringify(comment));
      cloneComment.userId.profileImage = filesUrls.getCorrectUrl(
        comment.userId.profileImage
      );
      return cloneComment;
    });
    return clone;
  });
  return newPosts;
}

async function addPost(data, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  const post = new Post({
    userId: userId,
    date: data.date,
    text: data.text,
    imgUrl: data.fileURL,
    likes: [],
    comments: [],
  });
  try {
    const response = await post.save();

    return response._id;
  } catch (error) {
    console.log(error);
  }
}

async function editPost(postId, text, imgUrl, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  try {
    let response;
    if (imgUrl == -1) {
      response = await Post.findOneAndUpdate(
        { _id: postId, userId: userId },
        {
          text: text,
        }
      );
    } else {
      response = await Post.findOneAndUpdate(
        { _id: postId, userId: userId },
        {
          text: text,
          imgUrl: imgUrl,
        }
      );
    }
    if (imgUrl != -1 && response.imgUrl) {
      filesLogic.deleteFile(response.imgUrl);
    }
    return "Successfully";
  } catch (error) {
    console.log(error);
  }
}

async function deletePost(postId, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  try {
    const response = await Post.findOneAndDelete({
      _id: postId,
      userId: userId,
    });
    if (response.imgUrl) {
      filesLogic.deleteFile(response.imgUrl);
    }
    await Comment.deleteMany({ _id: { $in: response.comments } });
    return "Successfully";
  } catch (error) {
    console.log(error);
  }
}

async function addLike(postId, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  try {
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: userId },
    });
    return "Successfully";
  } catch (error) {
    console.log(error);
  }
}

async function removeLike(postId, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  try {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
    });
    return "Successfully";
  } catch (error) {
    console.log(error);
  }
}

async function addComment(data, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  const comment = new Comment({
    userId: userId,
    text: data.text,
    date: data.date,
  });
  try {
    const addedComment = await comment.save();
    await Post.findByIdAndUpdate(
      data.postId,
      {
        $push: { comments: addedComment._id },
      },
      { new: true, useFindAndModify: false }
    );
    return addedComment._id;
  } catch (error) {
    console.log(error);
  }
}

async function deleteComment(postId, commentId, bearerToken) {
  const userId = encryption.bearerTokenToUserId(bearerToken);

  try {
    await Comment.findByIdAndDelete({ _id: commentId, userId: userId });
    await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: commentId },
      },
      { new: true, useFindAndModify: false }
    );
    return "Successfully";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAll,
  addPost,
  editPost,
  deletePost,
  addLike,
  removeLike,
  addComment,
  deleteComment,
};
