import React, { useMemo } from "react";
import { GifContainer } from "../../Style/ComponentStyles/GifPickerStyles";

interface Props {
  handleClick: (gif: any) => void;
  modalGifs: any;

  autoPlay: boolean;
}
const Gifs: React.FC<Props> = ({ modalGifs, handleClick, autoPlay }) => {
  return useMemo(() => {
    return (
      <GifContainer>
        {modalGifs.map((gif: any) => (
          <video
            width="100%"
            muted
            onClick={() => handleClick(gif)}
            key={gif.id}
            autoPlay={autoPlay ? true : false}
          >
            <source src={gif.images.preview.mp4} />
          </video>
        ))}
      </GifContainer>
    );
  }, [modalGifs, autoPlay]);
};

export default Gifs;
