import React, { useMemo } from "react";
import { UserStore } from "../../Store/UserStore";
import { UserWrapper, Image } from "../../Style/ComponentStyles/ChatStyles";
import Default from "../../Images/default_profile_400x400.png";
import dayjs from "dayjs";
import { ChatStore } from "../../Store/ChatStore";
interface ISingleChat {
  chat: any;
  userStore: UserStore;
  chatStore: ChatStore;
}
const SingleChat: React.FC<ISingleChat> = ({ chat, userStore, chatStore }) => {
  const whoToTalk = useMemo(() => chat.answerer.id === userStore.userData?.id, [
    userStore,
  ]);

  return (
    <UserWrapper onClick={() => chatStore.selectChat(chat.id)}>
      <Image
        src={
          whoToTalk
            ? chat.creator.avatar
              ? chat.creator.avatar.url
              : Default
            : chat.answerer.avatar
            ? chat.answerer.avatar.url
            : Default
        }
      />
      <div>
        <h4>{whoToTalk ? chat.creator.userName : chat.answerer.userName}</h4>
        <p style={{ fontSize: "0.8rem" }}>
          {dayjs(chat.lastActivity).format("h:mm A MMMM D, YYYY")}
        </p>
      </div>
    </UserWrapper>
  );
};

export default SingleChat;
