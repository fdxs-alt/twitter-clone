import React, { useEffect, useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import io, { Socket } from "socket.io-client";
import { getMessages } from "../../utils/API";
import styled from "styled-components";
import { IChat } from "../../Store/ChatStore";
import Default from "../../Images/default_profile_400x400.png";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineSend } from "react-icons/ai";
import { useObserver } from "mobx-react-lite";
const Wrapper = styled.div`
  width: 65%;
`;

const UserInfo = styled.div`
  padding: 0.9rem;
  display: flex;
  align-items: center;

  border-bottom: 3px solid ${(props) => props.theme.colors.hoverDark};
  h3 {
    color: white;
  }

  img {
    width: 35px;
    height: 35px;
    background-color: inherit;
    margin-right: 5px;
    border-radius: 50%;
  }
  p {
    color: ${(props) => props.theme.colors.lightGray};
    font-size: 0.6rem;
  }
`;

const MessagesWrapper = styled.div`
  height: 80%;
  overflow-x: hidden;
`;
const MessageInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
`;
const SendMessageButton = styled.button`
  width: 10%;
  background-color: inherit;
  color: ${(props) => props.theme.colors.secondary};
  border: none;

  &:hover {
    color: red;
  }
  &:focus {
    outline: none;
  }
`;
const TextArea = styled(TextareaAutosize)`
  width: 90%;
  background-color: ${(props) => props.theme.colors.hoverDark};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  resize: none;
  color: white;
  font-size: 0.8rem;
  border-radius: 1rem;
  padding: 0.6rem;
  font-family: inherit;
  overflow: hidden;
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

let socket: typeof Socket;
interface IChats {
  selectedChat: IChat | null;
}
const SelectedChats: React.FC<IChats> = ({ selectedChat }) => {
  const { userStore } = useRootStore();
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedChat) {
      return;
    }

    socket = io.connect("http://localhost:5000", {
      query: { token: userStore.accessToken, id: selectedChat.id },
    });

    socket.on("joined", (data: { isActive: boolean; userId: string }) => {
      if (data.userId !== userStore.userData?.id) {
        setActive(true);
      }
    });

    return () => {
      socket.emit("disconnect", { userId: userStore.userData?.id });
      setPage(0);
      setMessage("");
      setMessages([]);
      setActive(false);
    };
  }, [selectedChat, userStore.accessToken]);

  useEffect(() => {
    if (!selectedChat) return;

    const getAllChats = async () => {
      const { data } = await getMessages(
        page,
        selectedChat.id,
        userStore.setConfig()
      );

      setPage((prev) => prev + 1);
      setMessages((prev: any) => [...data, ...prev]);
    };

    getAllChats();
  }, [selectedChat]);

  const handleClick = () => {
    if (message)
      socket.emit("message", {
        content: message,
        chat: selectedChat?.id,
      });
  };

  return useObserver(() => {
    const user =
      selectedChat?.answerer.id === userStore.userData?.id
        ? selectedChat?.creator
        : selectedChat?.answerer;

    if (!selectedChat) return <div>no chat selected</div>;
    return (
      <Wrapper>
        <UserInfo>
          <img src={user?.avatar ? user.avatar.url : Default} alt="user-logo" />
          <div>
            <h3>{user?.userName}</h3>
            {active && <p>Active now</p>}
          </div>
        </UserInfo>
        <MessagesWrapper>
          {messages.map((mess: any) => (
            <h1>oj</h1>
          ))}
        </MessagesWrapper>
        <MessageInputWrapper>
          <TextArea
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            name="message"
            placeholder="Start a new message"
          />
          <SendMessageButton type="button" onClick={handleClick}>
            <AiOutlineSend fontSize={28} />
          </SendMessageButton>
        </MessageInputWrapper>
      </Wrapper>
    );
  });
};

export default SelectedChats;
