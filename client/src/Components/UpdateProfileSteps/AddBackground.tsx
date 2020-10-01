import React, { useCallback, useState } from "react";
import Logo from "../../Images/Twitter_Logo_WhiteOnImage.svg";
import { Button } from "../../Style/ComponentStyles/RegisterFormStyles";
import { useDropzone } from "react-dropzone";
import { encode } from "base64-arraybuffer";
import { DateInfo } from "../../Style/ComponentStyles/RegisterFormPagesStyle";
import { MdAddAPhoto } from "react-icons/md";
import {
  AddButton,
  BackgroundPhoto,
  ImageWrapper,
  Navigation,
  TwitterLogo,
  Wrapper,
} from "../../Style/ComponentStyles/MultiStepUpdateProfile";
import { initalState } from "./AddProfilePhoto";
import { Background } from "../../Style/ComponentStyles/ProfilePageStyles";
interface Props {
  background: any;
  setBackgroundPhoto: (background: any) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const AddBackground: React.FC<Props> = ({
  background,
  setBackgroundPhoto,
  setPage,
}) => {
  const [file, setFile] = useState<initalState | null>(null);
  const onDrop = useCallback(
    ([file]) => {
      const reader = new FileReader();
      setBackgroundPhoto(file);
      reader.onload = () => {
        const binaryStr = reader.result;
        setFile({
          buffer: Buffer.from(binaryStr as ArrayBuffer),
          originalname: file.name,
          mimetype: file.type,
          path: file.path,
        });
      };
      reader.readAsArrayBuffer(file);
    },
    [file, background]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/png, img/jpeg",
  });

  return (
    <Wrapper>
      <Navigation>
        <TwitterLogo src={Logo} />
        <Button type="button" onClick={() => setPage((prev) => prev + 1)}>
          {background ? "Next" : "Skip for now"}
        </Button>
      </Navigation>
      <h2 style={{ padding: "1rem 0" }}>Pick a header</h2>
      <DateInfo>
        People who visit your profile will see it. Show your style
      </DateInfo>
      <ImageWrapper {...getRootProps()}>
        <Background>
          {file ? (
            <BackgroundPhoto
              src={`data:image/jpeg;base64, ${encode(file.buffer)}`}
            />
          ) : null}
        </Background>

        <input {...getInputProps()} />
        <AddButton type="button">
          <MdAddAPhoto fontSize={28} />
        </AddButton>
      </ImageWrapper>
    </Wrapper>
  );
};

export default AddBackground;
