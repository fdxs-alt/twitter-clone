import { Field, Formik } from "formik";
import React from "react";
import { useRootStore } from "../../Store/RootStore";
import { Input, Label } from "../../Style/ComponentStyles/LoginPageStyles";
import {
  Button,
  InputWrapper,
  LoginForm,
} from "../../Style/ComponentStyles/RegisterPageStyles";
import * as yup from "yup";
import { Values } from "../../Pages/LoginPage/LoginPage";
import { useHistory } from "react-router-dom";
import { useObserver } from "mobx-react-lite";

const MainPageLoginForm = () => {
  const { userStore } = useRootStore();
  const history = useHistory();
  
  return useObserver(() => {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={yup.object({
          email: yup.string().required("This field is required"),
          password: yup.string().required("This field is required"),
        })}
        onSubmit={async (values: Values, { setSubmitting }) => {
          await userStore.login(values);
          setSubmitting(false);
          history.push("/home");
        }}
      >
        {(formik) => (
          <LoginForm onSubmit={formik.handleSubmit}>
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
    );
  });
};

export default MainPageLoginForm;
