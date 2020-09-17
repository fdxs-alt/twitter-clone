import { Field, Formik } from "formik";
import React from "react";
import TwitterIcon from "../../Images/Twitter_Logo_WhiteOnImage.svg";
import {
  Wrapper,
  TwitterTag,
  LoginTitle,
  LoginForm,
  InputWrapper,
  Input,
  Label,
  Button,
  LinkContainer,
  AuthLink,
} from "../../Style/ComponentStyles/LoginPageStyles";
import * as yup from "yup";
import { useObserver } from "mobx-react-lite";
import { useRootStore } from "../../Store/RootStore";

import { Error } from "../../Style/ComponentStyles/RegisterFormPagesStyle";
interface Values {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { userStore } = useRootStore();

  return useObserver(() => {
    return (
      <Wrapper>
        <TwitterTag src={TwitterIcon} />
        <LoginTitle>Log in to Twitter</LoginTitle>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object({
            email: yup.string().required("This field is required"),
            password: yup.string().required("This field is required"),
          })}
          onSubmit={async (values: Values, { setSubmitting }) => {
            await userStore.login(values);

            setSubmitting(false);
          }}
        >
          {(formik) => (
            <LoginForm onSubmit={formik.handleSubmit}>
              {userStore.error && <Error>{userStore.error}</Error>}
              <InputWrapper>
                <Field
                  name="email"
                  value={formik.values.email}
                  type="text"
                  as={Input}
                />
                <Label htmlFor="Phone, email, or username">
                  Phone, email, or username
                </Label>
              </InputWrapper>
              <InputWrapper>
                <Field
                  type="password"
                  name="password"
                  value={formik.values.password}
                  as={Input}
                />
                <Label htmlFor="Password">Password</Label>
              </InputWrapper>
              {!formik.values.email ||
              !formik.values.password ||
              formik.isSubmitting ? (
                <Button type="submit" disabled>
                  Log in
                </Button>
              ) : (
                <Button type="submit">Log in</Button>
              )}
            </LoginForm>
          )}
        </Formik>

        <LinkContainer>
          <AuthLink to="">Forgot password?</AuthLink>
          <AuthLink to="">Sign up for tweeter</AuthLink>
        </LinkContainer>
      </Wrapper>
    );
  });
};

export default LoginPage;
