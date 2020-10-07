import React, { useState, useRef } from "react";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import useClickOutside from "../../utils/hooks/useClickOutside";
import { EmojiButton } from "../../Style/ComponentStyles/TweetInputStyles";
interface Props {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Emoji: React.FC<Props> = ({ setDescription }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsPickerVisible(false);
  });

  return (
    <div ref={ref}>
      {isPickerVisible && (
        <Picker
          theme="dark"
          title="Pick emoji"
          onClick={(emoji: BaseEmoji) =>
            setDescription((prev) => prev + emoji.native)
          }
          style={{ position: "absolute", top: "40px" }}
        />
      )}
      <EmojiButton
        fontSize={28}
        onClick={() => setIsPickerVisible(!isPickerVisible)}
      />
    </div>
  );
};

export default Emoji;
