import { ErrorMessage, Field } from "formik";
import React from "react";
import {
  InputWrapper,
  Input,
  Label,
} from "../../Style/ComponentStyles/LoginPageStyles";
import {
  PageOneWrapper,
  Error,
} from "../../Style/ComponentStyles/RegisterFormPagesStyle";

const Page2 = () => {
  return (
    <PageOneWrapper>
      <InputWrapper>
        <ErrorMessage name="email" render={(msg) => <Error>{msg}</Error>} />
        <Field name="email" as={Input} type="email" />
        <Label htmlFor="">Email</Label>
      </InputWrapper>
      <InputWrapper>
        <ErrorMessage name="username" render={(msg) => <Error>{msg}</Error>} />
        <Field name="username" as={Input} />
        <Label htmlFor="">Username</Label>
      </InputWrapper>
      <InputWrapper>
        <ErrorMessage name="password" render={(msg) => <Error>{msg}</Error>} />
        <Field name="password" as={Input} type="password" />
        <Label htmlFor="">Password</Label>
      </InputWrapper>
      <InputWrapper>
        <ErrorMessage name="phone" render={(msg) => <Error>{msg}</Error>} />
        <Field name="phone" as={Input} />
        <Label htmlFor="">Phone</Label>
      </InputWrapper>
    </PageOneWrapper>
  );
};

export default Page2;
