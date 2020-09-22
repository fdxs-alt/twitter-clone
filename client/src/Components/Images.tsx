import React, { useMemo } from "react";
import { encode } from "base64-arraybuffer";
import { ImageContainer, Image } from "../Style/ComponentStyles/TweetInputStyles";

const Images = ({ files }: any) => {
  return useMemo(() => {
    return (
      <ImageContainer>
        {files.map((file: any) => (
          <Image src={`data:image/jpeg;base64, ${encode(file.buffer)}`} />
        ))}
      </ImageContainer>
    );
  }, [files]);
};

export default Images;
