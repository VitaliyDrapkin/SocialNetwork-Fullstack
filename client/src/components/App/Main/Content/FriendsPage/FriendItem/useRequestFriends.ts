import { useState } from "react";
import { FriendsRequests } from "./../../../../../../API/FriendsRequests";

export const useRequestFriends = (startedValue: boolean) => {
  const [requestSent, setRequestFriends] = useState(startedValue);
  const [error, setError] = useState("");

  const setRequest = async (value: boolean, userId: string) => {
    try {
      if (value) {
        await FriendsRequests.sendRequest(userId);
      } else {
        await FriendsRequests.cancelRequest(userId);
      }
      setRequestFriends(value);
    } catch (error) {
      setError(error);
    }
  };
  return { requestSent, setRequest, error };
};
