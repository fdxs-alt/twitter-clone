import React, { useMemo } from "react";
import { GifContainer } from "../../Style/ComponentStyles/GifPickerStyles";

interface Props {
  handleClick: (gif: any) => void;
  modalGifs: any;
}
const Gifs: React.FC<Props> = ({ modalGifs, handleClick }) => {
  return useMemo(() => {
    return (
      <GifContainer>
        {modalGifs.map((gif: any) => (
          <video
            width="100%"
            muted
            autoPlay
            loop
            onClick={() => handleClick(gif)}
          >
            <source src={gif.images.downsized_small.mp4} key={gif.id} />
          </video>
        ))}
      </GifContainer>
    );
  }, [modalGifs]);
};

export default Gifs;
