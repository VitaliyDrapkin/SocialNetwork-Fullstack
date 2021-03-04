import React, { Dispatch, useState, useRef } from "react";
import { connect } from "react-redux";
import { ProfileRequests } from "../../../../API/ProfileRequests";
import {
  actionsTypes,
  changeProfileStatusAC,
} from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import s from "./Status.module.css";

interface OwnProps {}

interface PropsFromState {
  isOwnProfile: boolean;
  status: string;
}

interface PropsFromDispatch {
  onEditStatus(status: string, oldStatus: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function Status(props: AllProps) {
  const [editor, setEditor] = useState(false);
  const [value, setValue] = useState(props.status);
  const ref = useRef(null);
  return (
    <>
      {props.isOwnProfile ? (
        <div className={s.profileStatus}>
          {editor ? (
            <input
              ref={ref}
              className={s.statusInput}
              type="text"
              value={value}
              maxLength={50}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                props.onEditStatus(value, props.status);
                setEditor(false);
              }}
              onKeyDown={(e) =>
                e.keyCode === 13 &&
                props.onEditStatus(value, props.status) &&
                setEditor(false)
              }
            />
          ) : (
            <div
              onClick={() => {
                setEditor(true);
                setTimeout(() => ref.current.focus(), 10);
              }}
            >
              {value || <> No status. Click here to add status</>}
            </div>
          )}
        </div>
      ) : (
        <div className={s.strangerProfileStatus}>{value}</div>
      )}
    </>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    isOwnProfile: state.profileData.isOwnProfile,
    status: state.profileData.status,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    onEditStatus: async (status: string, oldStatus: string) => {
      try {
        if (status === oldStatus) {
          return;
        }
        await ProfileRequests.editStatus(status);
        dispatch(changeProfileStatusAC(status));
      } catch (error) {
        alert("error change profile status");
      }
    },
  };
};

const StatusContainer = connect<
  PropsFromState,
  PropsFromDispatch,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(Status);
export default StatusContainer;
