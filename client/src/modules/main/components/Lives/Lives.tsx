import React, { Dispatch, useState, useRef } from "react";
import { connect } from "react-redux";
import { ProfileRequests } from "../../../../API/ProfileRequests";
import {
  actionsTypes,
  changeProfileLivesAC,
} from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import s from "./Lives.module.css";
import HomeIcon from "@material-ui/icons/Home";

interface OwnProps {}

interface PropsFromState {
  isOwnProfile: boolean;
  lives: string;
}

interface PropsFromDispatch {
  onEditLives(lives: string, oldLives: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function Lives(props: AllProps) {
  const [editor, setEditor] = useState(false);
  const [value, setValue] = useState(props.lives);
  const ref = useRef(null);
  return (
    <>
      {props.isOwnProfile ? (
        <div className={s.profileLives}>
          <HomeIcon fontSize="large" style={{ color: "#224DAB" }} />

          {editor ? (
            <input
              ref={ref}
              className={s.livesInput}
              type="text"
              value={value}
              maxLength={40}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                props.onEditLives(value, props.lives);
                setEditor(false);
              }}
              onKeyDown={(e) =>
                e.keyCode === 13 &&
                props.onEditLives(value, props.lives) &&
                setEditor(false)
              }
            />
          ) : (
            <div
              className={s.livesDiv}
              onClick={() => {
                setEditor(true);
                setTimeout(() => ref.current.focus(), 10);
              }}
            >
              {value ? (
                <span>Lives in {value}</span>
              ) : (
                <span>No information. Click to add city</span>
              )}
            </div>
          )}
        </div>
      ) : value ? (
        <div className={s.flexDiv}>
          <HomeIcon fontSize="large" style={{ color: "#224DAB" }} />
          <div className={s.strangerProfileLives}>Lives in {value}</div>
        </div>
      ) : null}
    </>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    isOwnProfile: state.profileData.isOwnProfile,
    lives: state.profileData.lives,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    onEditLives: async (lives: string, oldLives: string) => {
      try {
        if (lives === oldLives) {
          return;
        }
        await ProfileRequests.editLives(lives);
        dispatch(changeProfileLivesAC(lives));
      } catch (error) {
        alert("error change profile lives");
      }
    },
  };
};

const LivesContainer = connect<
  PropsFromState,
  PropsFromDispatch,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(Lives);
export default LivesContainer;
