import { Post } from "../models/post";
import { PostsServerResponse } from "../models/postsServerResponse";
import { store } from "../redux/store";
import { getValidToken, instance } from "./ApiSettings";

export const PostsRequests = {
  getAllPosts: async () => {
    const response = await instance.get<PostsServerResponse[]>(`/posts`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });

    const newPosts = response.data.map((postResponse) => {
      return new Post(
        postResponse._id,
        postResponse.userId._id,
        postResponse.userId.profileImage,
        postResponse.userId.firstName,
        postResponse.userId.lastName,
        postResponse.date,
        postResponse.text,
        postResponse.likes.length,
        postResponse.likes.includes(store.getState().authData.id),
        postResponse.comments,
        postResponse.imgUrl,
        false,
        postResponse.userId._id === store.getState().authData.id
      );
    });
    return newPosts;
  },

  addPost: async (text: string, date: number, fileURL: string) => {
    const response = await instance.post<string>(
      "/posts",
      {
        text,
        date,
        fileURL,
      },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data; //postId
  },

  editPost: async (postId: string, text: string, fileURL: string) => {
    const response = await instance.put<number>(
      `/posts/${postId}`,
      {
        text,
        fileURL,
      },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response; //status
  },

  deletePost: async (postId: string) => {
    await instance.delete<string>(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
  },

  addComment: async (text: string, date: number, postId: string) => {
    const response = await instance.post<string>(
      "/comments",
      {
        text,
        date,
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data; //commentId
  },

  deleteComment: async (postId: string, commentId: string) => {
    await instance.delete<string>(`/comments/${postId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
  },
  addLike: async (postId: string) => {
    await instance.post<string>(
      `likes/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
  },
  removeLike: async (postId: string) => {
    await instance.delete<string>(`likes/${postId}`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
  },

  addImage: async (formData: FormData): Promise<any> => {
    const response = await instance.post<any>("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    return response.data.imgUrl;
  },
};
