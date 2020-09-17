import Axios from "axios";
import { observable, action, runInAction } from "mobx";
import { loginURL, verifyURL } from "../../utils/Urls";

interface LoginInput {
  email: string;
  password: string;
}
interface VerifyInput {
  email: string;
  code: string;
}
export class UserStore {
  @observable accessToken: string = "";
  @observable userData = null;
  @observable isLoading = false;
  @observable error = "";

  @action
  async login(input: LoginInput) {
    this.isLoading = true;

    const data = {
      email: input.email,
      password: input.password,
    };

    try {
      const response = await Axios.post(loginURL, data);
      runInAction(() => {
        this.isLoading = false;
        this.userData = response.data.user;
        this.accessToken = response.data.accessToken;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = error.response.data.message;
      });
    }
  }

  @action
  async verify(input: VerifyInput) {
    this.isLoading = true;

    const data = {
      email: input.email,
      code: parseInt(input.code),
    };

    try {
      const response = await Axios.post(verifyURL, data);

      runInAction(() => {
        this.isLoading = false;
        this.userData = response.data.user;
        this.accessToken = response.data.accessToken;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = error.response.data.message;
      });
    }
  }
}
