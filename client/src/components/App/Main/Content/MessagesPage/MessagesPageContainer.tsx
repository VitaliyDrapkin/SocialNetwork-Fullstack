import { connect } from "react-redux";
import MessagesPage from "./MessagesPage";
import { PostsRequests } from "../../../../../API/PostsRequests";
import {
  actionsTypes,
  endLoadMessengerAC,
  setMessengerDataAC,
  setPostsAC,
  startLoadMessengerAC,
} from "../../../../../redux/actionTypes";
import { RootState } from "../../../../../redux/store";
import { Dispatch } from "react";
import { MessengerItem } from "../../../../../models/message";
import { MessagesRequests } from "../../../../../API/MessagesRequests";

interface mapStateToPropsType {
  messengers: MessengerItem[];
  loaded: boolean;
}

interface mapDispatchToPropsType {
  setMessengers(): Promise<void>;
}
let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    messengers: state.chatData.messengers,
    loaded: state.chatData.isMessengerLoaded,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    setMessengers: async () => {
      dispatch(startLoadMessengerAC());
      const messengers = await MessagesRequests.getMessengerData();
      dispatch(setMessengerDataAC(messengers));
      dispatch(endLoadMessengerAC());
    },
  };
};

const MainPageContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(MessagesPage);
export default MainPageContainer;
