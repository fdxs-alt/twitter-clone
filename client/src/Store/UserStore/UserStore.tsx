import Axios from "axios";
import { observable, action } from "mobx";
import { registerURL } from "../../utils/Urls";

interface LoginInput {
  email: string;
  password: string;
}
export class UserStore {
  @observable accessToken: string = "";
  @observable userData = [];
  @observable isLoading = false;
  @observable error = [];

  @action
  async login(input: LoginInput) {
    this.isLoading = true;

    const data = {
      email: input.email,
      password: input.password,
    };

    try {
      const response = await Axios.post(registerURL, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
