import React from "react";
import Navbar from "../Components/Layout/Navbar";
import { Main } from "../Style/ComponentStyles/SharedStyles";
import styled from "styled-components";
import Chats from "../Components/Chatroom/Chats";

const ChatWrapper = styled.div`
  width: 75%;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.hoverDark};
`;

const ChatroomsPage = () => {
  return (
    <Main>
      <Navbar />
      <ChatWrapper>
        <Chats />
      </ChatWrapper>
    </Main>
  );
};

export default ChatroomsPage;
