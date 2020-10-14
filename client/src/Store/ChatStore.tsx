import { action, observable, runInAction } from "mobx";
import { getChats } from "../utils/API";
import { UserStore } from "./UserStore";

export class ChatStore {
  @observable chatLoading = false;
  @observable chats = [];
  @observable selectedChat = null;
  @observable error = "";

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
}
