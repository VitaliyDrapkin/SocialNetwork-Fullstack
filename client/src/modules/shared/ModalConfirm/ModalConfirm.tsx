import React, { MouseEvent, useEffect } from "react";
import s from "./ModalConfirm.module.css";
import ClearIcon from "@material-ui/icons/Clear";

interface OwnProps {
  questionText: string;
  secondaryText: string;
  confirm(): void;
  cancel(): void;
}

function ModalConfirm(props: OwnProps) {
  const onClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      props.cancel();
    }
  };

  // Add event listeners
  useEffect(() => {
    let downHandler = ({ key }: KeyboardEvent) => {
      if (key === "Enter") {
        let confirm = props.confirm;
        confirm();
      }
      if (key === "Escape") {
        let cancel = props.cancel;
        cancel();
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [props.confirm, props.cancel]);

  return (
    <div className={s.modalWindow} onClick={onClickOutside}>
      <div className={s.modalField}>
        <div className={s.modalTop}>
          <div className={s.mainText}>{props.questionText}</div>
          <div className={s.existBTN} onClick={props.cancel}>
            <ClearIcon fontSize="large" />
          </div>
        </div>
        <div className={s.modalMiddle}>
          <div className={s.secondaryText}>{props.secondaryText}</div>
        </div>
        <div className={s.modalBottom}>
          <div className={s.cancel} onClick={props.cancel}>
            cancel
          </div>
          <div className={s.confirm} onClick={props.confirm}>
            Delete
          </div>
          <input type="submit" className={s.eventSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
