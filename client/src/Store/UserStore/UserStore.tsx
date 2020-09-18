import Axios from "../../utils/Axios";
import { observable, action, runInAction } from "mobx";
import { loginURL, revokeURL, verifyURL } from "../../utils/Urls";

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
  async revoke() {
    this.revokeLoading = true;

    try {
      const response = await Axios.post(revokeURL, null, {
        withCredentials: true,
      });

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
}
