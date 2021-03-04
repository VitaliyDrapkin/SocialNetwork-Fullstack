import React, { MouseEvent, useEffect } from "react";
import s from "./ModalConfirm.module.css";
import ClearIcon from "@material-ui/icons/Clear";

interface ModalConfirmProps {
  questionText: string;
  secondaryText: string;
  confirm(): void;
  cancel(): void;
}

function ModalConfirm(props: ModalConfirmProps) {
  const onClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      props.cancel();
    }
  };

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === "Enter") {
      props.confirm();
    }
    if (key === "Escape") {
      props.cancel();
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return (
    <div
      className={s.modalWindow}
      onClick={onClickOutside}
    >
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
