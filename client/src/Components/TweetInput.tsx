import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useRootStore } from "../Store/RootStore";
import DefaultImage from "../Images/default_profile_400x400.png";
import TextareaAutosize from "react-textarea-autosize";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
const TweetForm = styled.form`
  width: 100%;
  padding: 1rem;
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
`;
const Avatar = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 0.4rem;
  border-radius: 50%;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  background-color: inherit;
  border: none;
  resize: none;
  color: white;
  font-size: 1.1rem;
  padding: 0.4rem;
  font-family: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
    font-size: 1.3rem;
  }
`;

const TweetInput = () => {
  const { userStore } = useRootStore();
  const [description, setDescription] = useState("");

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
      <Wrapper>
        <Picker
          showPreview={false}
          theme="dark"
          title="Pick emoji"
          
          onClick={(emoji: any) =>
            setDescription((prev) => prev + emoji.native)
          }
          style={{ position: "absolute", top: "20px" }}
        />
      </Wrapper>
    </TweetForm>
  );
};

export default TweetInput;
