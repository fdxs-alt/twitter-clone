import React from "react";
import styled from "styled-components";
import {
  Input,
  InputWrapper,
  Label,
} from "../../Style/ComponentStyles/LoginPageStyles";
const Wrapper = styled.div`
  width: 100%;
`;
interface Props {
  city: string;
  description: string;
  link: string;
  country: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}
const UpdateBio: React.FC<Props> = ({
  setDescription,
  setCity,
  setLink,
  setCountry,
  link,
  city,
  description,
  country,
}) => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <InputWrapper style={{ width: "40%" }}>
          <Input
            type="text"
            value={city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
          />
          <Label htmlFor="city">City</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            value={country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCountry(e.target.value)
            }
          />
          <Label htmlFor="country">Country</Label>
        </InputWrapper>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <InputWrapper style={{ width: "40%" }}>
          <Input
            type="text"
            value={link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
          <Label htmlFor="link">Link</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <Label htmlFor="description">Description</Label>
        </InputWrapper>
      </div>
    </Wrapper>
  );
};

export default UpdateBio;
