import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import s from "./FriendsSearch.module.css";

interface FriendsSearchProps {
  newFriendsPage: boolean;
  filter: string;
  onChangeFilter(value: string): Promise<void>;
  onNewFriendsSearch(value: string): Promise<void>;
}
function FriendsSearch(props: FriendsSearchProps) {
  return (
    <div className={s.friendsSearch}>
      <div className={s.searchIcon}>
        <SearchIcon style={{ color: "#95A5BD" }} />
      </div>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Search"
          value={props.filter}
          onChange={(e) =>
            props.newFriendsPage
              ? props.onNewFriendsSearch(e.target.value)
              : props.onChangeFilter(e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default FriendsSearch;
