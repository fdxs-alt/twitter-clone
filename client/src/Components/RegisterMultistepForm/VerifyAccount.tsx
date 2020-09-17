import React from "react";
import {
  Button,
  Input,
  InputWrapper,
  Label,
} from "../../Style/ComponentStyles/LoginPageStyles";
import { VerifyAccountWrapper } from "../../Style/ComponentStyles/RegisterFormStyles";

interface Props {
  email: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
const VerifyAccount: React.FC<Props> = ({ email, code, setCode }) => {
  return (
    <VerifyAccountWrapper>
      <h2 style={{ padding: "1rem 0" }}>Verify your account</h2>
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
      <Button type="button" style={{ marginTop: "2rem" }}>
        Verify
      </Button>
    </VerifyAccountWrapper>
  );
};

export default VerifyAccount;
