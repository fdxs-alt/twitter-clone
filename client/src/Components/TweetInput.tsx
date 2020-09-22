import React, { ChangeEvent, useCallback, useState } from "react";
import { useRootStore } from "../Store/RootStore";
import DefaultImage from "../Images/default_profile_400x400.png";
import Emoji from "./Emoji";
import {
  Avatar,
  Button,
  IconWrapper,
  ImageButton,
  ImageButtonWrapper,
  TextArea,
  TweetForm,
  Wrapper,
} from "../Style/ComponentStyles/TweetInputStyles";
import { useDropzone } from "react-dropzone";
import Images from "./Images";

const TweetInput = () => {
  const { userStore } = useRootStore();
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<any>([]);

  const onDrop = useCallback(
    ([file]) => {
      console.log(file);
      const reader = new FileReader();

      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setFiles([
          {
            buffer: Buffer.from(binaryStr as ArrayBuffer),
            originalname: file.name,
            mimetype: file.type,
            path: file.path,
          },
          ...files,
        ]);
      };
      reader.readAsArrayBuffer(file);
    },
    [files]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/png, img/jpeg",
  });

  return (
    <TweetForm>
      <Wrapper>
        <Avatar
          src={
            userStore.userData?.avatar
              ? userStore.userData.avatar.url
              : DefaultImage
          }
        />
        <TextArea
          name="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder="What's happening"
        />
      </Wrapper>
      <Images files={files} />
      <IconWrapper>
        <div style={{ display: "flex" }}>
          <Emoji setDescription={setDescription} />
          <ImageButtonWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            <ImageButton fontSize={28} />
          </ImageButtonWrapper>
        </div>
        <Button type="submit" disabled={description ? false : true}>
          Tweet
        </Button>
      </IconWrapper>
    </TweetForm>
  );
};

export default TweetInput;
