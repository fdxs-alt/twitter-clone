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
import Axios from "../utils/Axios";
import { postTweetURL } from "../utils/Urls";
const TweetInput = () => {
  const { userStore } = useRootStore();
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<any>([]);
  const [filesToSend, setFilesToSend] = useState<any[]>([]);
  const onDrop = useCallback(
    ([file]) => {
      const reader = new FileReader();
      setFilesToSend([file, ...filesToSend]);
      reader.onload = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = new FormData();

    filesToSend.forEach((file) => {
      dataToSend.append("tweetImages", file);
    });

    dataToSend.append("message", description);
    dataToSend.append("gif", "");
    dataToSend.append("tags", "");

    try {
      const response = await Axios.post(
        postTweetURL,
        dataToSend,
        userStore.setFormDataConfig()
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <TweetForm
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
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
