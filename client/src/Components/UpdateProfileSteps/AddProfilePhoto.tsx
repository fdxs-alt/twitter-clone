import React, { useCallback, useState } from "react";
import Logo from "../../Images/Twitter_Logo_WhiteOnImage.svg";
import DefaultPicture from "../../Images/default_profile_400x400.png";
import { Button } from "../../Style/ComponentStyles/RegisterFormStyles";
import { useDropzone } from "react-dropzone";
import { encode } from "base64-arraybuffer";
import { DateInfo } from "../../Style/ComponentStyles/RegisterFormPagesStyle";
import { MdAddAPhoto } from "react-icons/md";
import {
  AddButton,
  Avatar,
  ImageWrapper,
  Navigation,
  TwitterLogo,
  Wrapper,
} from "../../Style/ComponentStyles/MultiStepUpdateProfile";
interface Props {
  profilePhoto: any;
  setProfilePhoto: (photo: any) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export type initalState = {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  path: string;
};
const AddProfilePhoto: React.FC<Props> = ({
  profilePhoto,
  setProfilePhoto,
  setPage,
}) => {
  const [file, setFile] = useState<initalState | null>(null);
  const onDrop = useCallback(
    ([file]) => {
      const reader = new FileReader();
      setProfilePhoto(file);
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
    [setProfilePhoto]
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
          {profilePhoto ? "Next" : "Skip for now"}
        </Button>
      </Navigation>
      <h2 style={{ padding: "1rem 0" }}>Pick a profile picture</h2>
      <DateInfo>Have a favourite selfie? Upload it now.</DateInfo>
      <ImageWrapper {...getRootProps()}>
        <Avatar
          src={
            file
              ? `data:image/jpeg;base64, ${encode(file.buffer)}`
              : DefaultPicture
          }
        />
        <input {...getInputProps()} />
        <AddButton type="button">
          <MdAddAPhoto fontSize={28} />
        </AddButton>
      </ImageWrapper>
    </Wrapper>
  );
};

export default AddProfilePhoto;
