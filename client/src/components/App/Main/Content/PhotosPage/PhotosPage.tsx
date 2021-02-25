import React from "react";
import s from "./PhotosPage.module.css";
import profilePicture from "../../../../../assets/images/profilePicture.jpg";

function PhotosPage() {
  return (
    <div className={s.photosPage}>
      <div className={s.photosPageTop}>
        <div className={s.Headline}>
          My photos : <span>20</span>
        </div>
        <div className={s.addPhotoBTN}>
          <button>Add photo</button>
        </div>
      </div>
      <div className={s.photosPageMain}>
        <div className={s.photos}>
          <div className={s.photo}>
            <img src={profilePicture} alt="" />
          </div>
          <div className={s.photo}>
            <img src={profilePicture} alt="" />
          </div>
          <div className={s.photo}>
            <img src={profilePicture} alt="" />
          </div>
          <div className={s.photo}>
            <img src={profilePicture} alt="" />
          </div>
          <div className={s.photo}>
            <img src={profilePicture} alt="" />
          </div>
          <div className={s.empty}></div>
          <div className={s.empty}></div>
          <div className={s.empty}></div>
        </div>
      </div>
    </div>
  );
}

export default PhotosPage;
