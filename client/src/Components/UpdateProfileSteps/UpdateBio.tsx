import React, { useState } from "react";
import styled from "styled-components";

import {
  Input,
  InputWrapper,
  Label,
} from "../../Style/ComponentStyles/LoginPageStyles";
const Wrapper = styled.div`
  width: 100%;
`;
const UpdateBio = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <InputWrapper>
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
        <InputWrapper>
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
