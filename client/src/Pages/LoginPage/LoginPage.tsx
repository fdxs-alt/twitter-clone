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

interface Values {
  emailPhoneOrUserName: string;
  password: string;
}

const LoginPage = () => {
  return (
    <Wrapper>
      <TwitterTag src={TwitterIcon} />
      <LoginTitle>Log in to Twitter</LoginTitle>

      <Formik
        initialValues={{ emailPhoneOrUserName: "", password: "" }}
        validationSchema={yup.object({
          emailPhoneOrUserName: yup.string().required("This field is required"),
          password: yup.string().required("This field is required"),
        })}
        onSubmit={(values: Values, { setSubmitting }) => {
          console.log(values, setSubmitting);
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <LoginForm onSubmit={formik.handleSubmit}>
            <InputWrapper>
              <Field
                name="emailPhoneOrUserName"
                value={formik.values.emailPhoneOrUserName}
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
            {!formik.values.emailPhoneOrUserName || !formik.values.password ||  formik.isSubmitting ? (
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
};

export default LoginPage;
