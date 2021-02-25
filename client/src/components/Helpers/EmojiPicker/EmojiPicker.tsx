import React, { useEffect, useRef } from "react";
import s from "./EmojiPicker.module.css";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

interface EmojiPickerProps {
  closePicker(): void;
  onAddEmoji(emoji: string): void;
}
function EmojiPicker(props: EmojiPickerProps) {
  const ref = useRef();
  useOnClickOutside(ref, props.closePicker);

  const onEmojiClick = (event: any, emojiObject: any) => {
    props.onAddEmoji(emojiObject.emoji);
  };

  return (
    <div className={s.emojiPicker} ref={ref}>
      <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />
    </div>
  );
}

export default EmojiPicker;

function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
