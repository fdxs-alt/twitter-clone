import Axios from "../utils/Axios";
import { observable, action, runInAction } from "mobx";
import { loginURL, logoutURL, revokeURL, verifyURL } from "../utils/Urls";
import { AxiosRequestConfig } from "axios";

interface LoginInput {
  email: string;
  password: string;
}
interface VerifyInput {
  email: string;
  code: string;
}
interface UserData {
  avatar?: {
    id: string;
    key: string;
    url: string;
    created: string;
    updated: string;
  };
  background?: {
    id: string;
    key: string;
    url: string;
    created: string;
    updated: string;
  };
  city?: string;
  code?: string;
  confirmed: boolean;
  country?: string | null;
  created?: string;
  description: string | null;
  email: string;
  fullName: string;
  id: string;
  name: string;
  phone: string;
  profileLink?: string;
  surname: string;
  userName: string;
}
export class UserStore {
  @observable accessToken: string = "";
  @observable userData?: UserData;
  @observable isLoading = false;
  @observable revokeLoading = false;
  @observable error = "";
  @observable isAuthenticated = false;

  @action
  async login(input: LoginInput) {
    this.error = "";
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
        this.isAuthenticated = true;
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
    this.error = "";
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
        this.isAuthenticated = true;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = error.response.data.message;
      });
    }
  }
  @action
  async logout() {
    try {
      await Axios.get(logoutURL, this.setConfig());
      runInAction(() => {
        this.userData = undefined;
        this.accessToken = "";
        this.isAuthenticated = false;
      });
    } catch (error) {
      runInAction(() => {
        this.userData = undefined;
        this.accessToken = "";
        this.isAuthenticated = false;
      });
    }
  }
  @action
  async revoke() {
    this.revokeLoading = true;

    try {
      const response = await Axios.post(revokeURL);

      runInAction(() => {
        this.revokeLoading = false;
        this.userData = response.data.user;
        this.accessToken = response.data.accessToken;

        if (response.data.accessToken) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.revokeLoading = false;
        this.isAuthenticated = false;
      });
    }
  }

  setConfig() {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-type": "application/json",
      },
    };

    config.headers["Authorization"] = this.accessToken;

    return config;
  }
}
