import { Field } from "formik";
import React from "react";
import styled from "styled-components";
import {
  Input,
  InputWrapper,
  Label,
} from "../../Style/ComponentStyles/LoginPageStyles";

const PageOneWrapper = styled.div`
  width: 100%;

  & > div {
    margin-bottom: 2.5rem;
  }
`;
const DateInputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & > div {
    margin-right: 2rem;
  }
`;
const DateInfo = styled.p`
  color: ${(props) => props.theme.colors.lightGray};
  padding: 0.6rem 0;
`;

const Page1 = () => {
  return (
    <PageOneWrapper>
      <h2 style={{ padding: "1rem 0" }}>Create your account</h2>
      <InputWrapper>
        <Field name="name" as={Input} />
        <Label htmlFor="">Name</Label>
      </InputWrapper>
      <InputWrapper>
        <Field name="surname" as={Input} />
        <Label htmlFor="">Surname</Label>
      </InputWrapper>
      <div>
        <h5 style={{ padding: "0.2rem 0" }}>Date of birth</h5>
        <DateInfo>
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </DateInfo>
        <DateInputWrapper>
          <InputWrapper>
            <Field name="day" as={Input} />
            <Label htmlFor="">Day</Label>
          </InputWrapper>
          <InputWrapper>
            <Field name="month" as={Input} />
            <Label htmlFor="">Month</Label>
          </InputWrapper>
          <InputWrapper style={{ marginRight: "0" }}>
            <Field name="year" as={Input} />
            <Label htmlFor="">Year</Label>
          </InputWrapper>
        </DateInputWrapper>
      </div>
    </PageOneWrapper>
  );
};

export default Page1;
