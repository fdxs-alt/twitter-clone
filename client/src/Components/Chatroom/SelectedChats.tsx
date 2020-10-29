import React, { useEffect, useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import io, { Socket } from "socket.io-client";
let socket: typeof Socket;
interface IChats {
  selectedChat: string | null;
}
const SelectedChats: React.FC<IChats> = ({ selectedChat }) => {
  const { userStore } = useRootStore();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!selectedChat) {
      return;
    }
    socket = io.connect("http://localhost:5000", {
      query: { token: userStore.accessToken, id: selectedChat },
    });

    socket.on("joined", (data: { isActive: boolean; userId: string }) => {
      if (data.userId !== userStore.userData?.id) {
        setActive(true);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, [selectedChat]);

  if (!selectedChat) return <div>no chat selected</div>;
  return <div>User is {active ? "active" : "not active"}</div>;
};

export default SelectedChats;
