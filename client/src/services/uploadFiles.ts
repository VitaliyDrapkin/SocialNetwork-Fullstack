import { PostsRequests } from "../API/PostsRequests";

//add file helpers functions
const createFormDataImage = (image: File): FormData => {
  const formData = new FormData();
  formData.append("image", image);
  return formData;
};

export const addFileServer = async (file: File): Promise<string> => {
  const formData = createFormDataImage(file);
  return await PostsRequests.addImage(formData);
};
