import React, { Dispatch, useState, useRef } from "react";
import { connect } from "react-redux";
import { ProfileRequests } from "../../../../../../API/ProfileRequests";
import {
  actionsTypes,
  changeProfileRelationshipAC,
} from "../../../../../../redux/actionTypes";
import { RootState } from "../../../../../../redux/store";
import s from "./Relationship.module.css";
import FavoriteIcon from "@material-ui/icons/Favorite";

interface RelationshipProps {
  isOwnProfile: boolean;
  relationship: string;
  onEditRelationship(
    relationship: string,
    oldRelationship: string
  ): Promise<void>;
}
function Relationship(props: RelationshipProps) {
  const [editor, setEditor] = useState(false);
  const [value, setValue] = useState(props.relationship);
  const ref = useRef(null);
  return (
    <>
      {props.isOwnProfile ? (
        <div className={s.profileRelationship}>
          <FavoriteIcon fontSize="large" style={{ color: "#224DAB" }} />

          {editor ? (
            <select
              className={s.relationship}
              ref={ref}
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                props.onEditRelationship(value, props.relationship);
                setEditor(false);
              }}
              onKeyDown={(e) =>
                e.keyCode === 13 &&
                props.onEditRelationship(value, props.relationship) &&
                setEditor(false)
              }
            >
              <option>Single</option>
              <option>Married</option>
              <option>In relationship</option>
            </select>
          ) : (
            <div
              className={s.divRelationship}
              onClick={() => {
                setEditor(true);
                setTimeout(() => ref.current.focus(), 10);
              }}
            >
              {value ? (
                <span>{value}</span>
              ) : (
                <span>No information. Click to add relationship</span>
              )}
            </div>
          )}
        </div>
      ) : value ? (
        <div className={s.flexDiv}>
          <FavoriteIcon fontSize="large" style={{ color: "#224DAB" }} />
          <div className={s.strangerProfileRelationship}>{value}</div>
        </div>
      ) : null}
    </>
  );
}

interface mapStateToPropsType {
  isOwnProfile: boolean;
  relationship: string;
}

interface mapDispatchToPropsType {
  onEditRelationship(
    relationship: string,
    oldRelationship: string
  ): Promise<void>;
}

let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    isOwnProfile: state.profileData.isOwnProfile,
    relationship: state.profileData.relationship,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    onEditRelationship: async (
      relationship: string,
      oldRelationship: string
    ) => {
      try {
        if (relationship === oldRelationship) {
          return;
        }
        await ProfileRequests.editRelationship(relationship);
        dispatch(changeProfileRelationshipAC(relationship));
      } catch (error) {
        alert("error change profile lives");
      }
    },
  };
};

const RelationshipContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(Relationship);
export default RelationshipContainer;
