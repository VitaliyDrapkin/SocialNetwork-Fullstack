import React, { Dispatch, useEffect } from "react";
import s from "./MessagesPage.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { connect } from "react-redux";
import { MessengerItem } from "../../../../models/message";
import MessagesItem from "../../components/MessagesItem";
import { RootState } from "../../../../redux/store";
import {
  actionsTypes,
  endLoadMessengerAC,
  setMessengerDataAC,
  startLoadMessengerAC,
} from "../../../../redux/actionTypes";
import { MessagesRequests } from "../../../../API/MessagesRequests";

interface OwnProps {}

interface PropsFromState {
  messengers: MessengerItem[];
  loaded: boolean;
}

interface PropsFromDispatch {
  setMessengers(): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function MessagesPage(props: AllProps) {
  useEffect(() => {
    let loadMessages = props.setMessengers;
    loadMessages();
  }, [props.setMessengers]);

  return props.loaded ? (
    <div className={s.messagesPage}>
      <div className={s.title}>
        <div className={s.titleText}>
          <span>Messages</span>
        </div>
        <div className={s.editIcon}>
          <AddCircleOutlineIcon fontSize="large" />
        </div>
      </div>
      {props.messengers.map((messenger) => (
        <MessagesItem
          userId={messenger.userId}
          firstName={messenger.userFirstName}
          lastName={messenger.userLastName}
          profileImg={messenger.profileImg}
          lastMessage={messenger.lastMessage}
        />
      ))}
    </div>
  ) : null;
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    messengers: state.chatData.messengers,
    loaded: state.chatData.isMessengerLoaded,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    setMessengers: async () => {
      dispatch(startLoadMessengerAC());
      const messengers = await MessagesRequests.getMessengerData();
      dispatch(setMessengerDataAC(messengers));
      dispatch(endLoadMessengerAC());
    },
  };
};

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(MessagesPage);
