import React, { ChangeEvent, useState } from "react";
import { useRootStore } from "../Store/RootStore";
import DefaultImage from "../Images/default_profile_400x400.png";
import Emoji from "./Emoji";
import { Avatar, Button, IconWrapper, TextArea, TweetForm, Wrapper } from "../Style/ComponentStyles/TweetInputStyles";

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
      <IconWrapper>
        <Emoji setDescription={setDescription} />
        <Button type="submit" disabled={description ? false : true}>
          Tweet
        </Button>
      </IconWrapper>
    </TweetForm>
  );
};

export default TweetInput;
