import { action, observable, runInAction } from "mobx";
import { createChat, getChats } from "../utils/API";
import { UserStore } from "./UserStore";

export class ChatStore {
  @observable chatLoading = false;
  @observable chats: any = [];
  @observable selectedChat: string | null = null;
  @observable error = "";
  @observable creatingChatLoading = false;
  constructor(private userStore: UserStore) {}

  @action
  async getAllChats() {
    this.chatLoading = true;
    try {
      const data = await getChats(this.userStore.setConfig());

      runInAction(() => {
        this.chats = data.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.response.message;
      });
    }
    this.chatLoading = false;
  }
  @action
  async createChat(id: string) {
    this.creatingChatLoading = true;
    try {
      const response = await createChat(id, this.userStore.setConfig());
      this.chats = [response.data, ...this.chats];
      runInAction(() => {
        this.creatingChatLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error.response);
        this.creatingChatLoading = false;
      });
    }
  }

  @action
  selectChat(id: string) {
    this.selectedChat = id;
  }
}
