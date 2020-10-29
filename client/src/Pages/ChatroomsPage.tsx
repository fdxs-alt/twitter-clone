import React from "react";
import Navbar from "../Components/Layout/Navbar";
import { Main } from "../Style/ComponentStyles/SharedStyles";
import styled from "styled-components";
import Chats from "../Components/Chatroom/Chats";
import SelectedChats from "../Components/Chatroom/SelectedChats";
import { useObserver } from "mobx-react-lite";
import { useRootStore } from "../Store/RootStore";

const ChatWrapper = styled.div`
  width: 75%;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.hoverDark};
`;

const ChatroomsPage = () => {
  const { chatStore } = useRootStore();
  return useObserver(() => {
    return (
      <Main>
        <Navbar />
        <ChatWrapper>
          <Chats />
          <SelectedChats selectedChat={chatStore.selectedChat} />
        </ChatWrapper>
      </Main>
    );
  });
};

export default ChatroomsPage;
