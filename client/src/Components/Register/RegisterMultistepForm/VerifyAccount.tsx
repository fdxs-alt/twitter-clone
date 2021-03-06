import { useObserver } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../../Store/RootStore";
import {
  Button,
  Input,
  InputWrapper,
  Label,
} from "../../../Style/ComponentStyles/LoginPageStyles";
import { VerifyAccountWrapper } from "../../../Style/ComponentStyles/RegisterFormStyles";
import { useHistory } from "react-router-dom";
import { Error } from "../../../Style/ComponentStyles/RegisterFormPagesStyle";
interface Props {
  email: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
const VerifyAccount: React.FC<Props> = ({ email, code, setCode }) => {
  const { userStore } = useRootStore();
  const history = useHistory();
  return useObserver(() => {
    return (
      <VerifyAccountWrapper>
        <h2 style={{ padding: "1rem 0" }}>Verify your account</h2>
        {userStore.error && <Error>{userStore.error}</Error>}
        <InputWrapper>
          <Input
            name="day"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
          />
          <Label htmlFor="day">Code</Label>
        </InputWrapper>
        <Button
          type="button"
          style={{ marginTop: "2rem" }}
          onClick={async () => {
            const input = {
              email,
              code,
            };

            await userStore.verify(input);
            if (userStore.accessToken && userStore.userData)
              history.push("/home");
          }}
          disabled={userStore.isLoading}
        >
          Verify
        </Button>
      </VerifyAccountWrapper>
    );
  });
};

export default VerifyAccount;
