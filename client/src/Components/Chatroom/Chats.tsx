import React, { ChangeEvent, useEffect, useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import { Title } from "../../Style/ComponentStyles/SharedStyles";
import { useObserver } from "mobx-react-lite";
import Loader from "../Loader";
import { BiMessageAdd } from "react-icons/bi";
import Modal from "../Layout/Modal";
import UsersSearch from "./UsersSearch";
import {
  AddChatButton,
  SearchContainer,
  SearchInput,
  Container,
} from "../../Style/ComponentStyles/ChatStyles";
import SingleChat from "./SingleChat";

const Chats = () => {
  const { chatStore, userStore } = useRootStore();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    chatStore.getAllChats();
  }, [chatStore]);

  return useObserver(() => {
    if (chatStore.chatLoading) return <Loader />;
    return (
      <Container>
        <Title>
          Messages
          <AddChatButton type="button" onClick={() => setOpen(true)}>
            <BiMessageAdd fontSize={28} />
          </AddChatButton>
        </Title>
        <SearchContainer>
          <SearchInput
            type="text"
            value={filter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilter(e.target.value)
            }
            placeholder="Search for people"
          />
        </SearchContainer>
        {open && (
          <Modal
            open={open}
            closeModal={() => setOpen(false)}
            isPadding={false}
          >
            <UsersSearch close={() => setOpen(false)} />
          </Modal>
        )}
        {chatStore.chats.map((chat: any) => (
          <SingleChat
            chat={chat}
            userStore={userStore}
            chatStore={chatStore}
            key={chat.id}
          />
        ))}
      </Container>
    );
  });
};

export default Chats;
