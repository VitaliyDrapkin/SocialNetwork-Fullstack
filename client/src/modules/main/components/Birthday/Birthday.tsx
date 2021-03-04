import React, { Dispatch, useState, useRef } from "react";
import { connect } from "react-redux";
import { ProfileRequests } from "../../../../API/ProfileRequests";
import {
  actionsTypes,
  changeProfileBirthdayAC,
} from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import s from "./Birthday.module.css";
import CakeIcon from "@material-ui/icons/Cake";
import { dateShowCalculate } from "../../../../services/dateShowCalculate";

interface OwnProps {
}

interface PropsFromState {
  isOwnProfile: boolean;
  birthday: number;
}

interface PropsFromDispatch {
  onEditBirthday(birthday: number, oldBirthday: number): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;


function Birthday(props: AllProps) {
  const [editor, setEditor] = useState(false);
  const [value, setValue] = useState(props.birthday);
  const ref = useRef(null);
  return (
    <>
      {props.isOwnProfile ? (
        <div className={s.profileBirthday}>
          <CakeIcon fontSize="large" style={{ color: "#224DAB" }} />
          {editor ? (
            <input
              ref={ref}
              className={s.dateInput}
              type="date"
              value={new Date(value).toISOString().slice(0, 10)}
              onChange={(e) => setValue(new Date(e.target.value).getTime())}
              onBlur={() => {
                props.onEditBirthday(value, props.birthday);
                setEditor(false);
              }}
              onKeyDown={(e) =>
                e.keyCode === 13 &&
                props.onEditBirthday(value, props.birthday) &&
                setEditor(false)
              }
            />
          ) : (
            <div
              className={s.birthDay}
              onClick={() => {
                setEditor(true);
                setTimeout(() => ref.current.focus(), 10);
              }}
            >
              {value ? (
                <span>Birthday : {dateShowCalculate(value)}</span>
              ) : (
                <span>No information. Click to add city</span>
              )}
            </div>
          )}
        </div>
      ) : value ? (
        <div className={s.flexDiv}>
          <CakeIcon fontSize="large" style={{ color: "#224DAB" }} />
          <div className={s.strangerProfileBirthday}>
            Birthday : {dateShowCalculate(value)}
          </div>
        </div>
      ) : null}
    </>
  );
}



let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    isOwnProfile: state.profileData.isOwnProfile,
    birthday: state.profileData.birthDay,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    onEditBirthday: async (birthday: number, oldBirthday: number) => {
      try {
        if (birthday === oldBirthday) {
          return;
        }
        await ProfileRequests.editBirthday(birthday);
        dispatch(changeProfileBirthdayAC(birthday));
      } catch (error) {
        alert("error change profile birthday");
      }
    },
  };
};

const BirthdayContainer = connect<
  PropsFromState,
  PropsFromDispatch,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(Birthday);
export default BirthdayContainer;
