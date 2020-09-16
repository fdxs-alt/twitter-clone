import React from "react";
import { Formik } from "formik";
// TODO
const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        username: "",
        day: 0o1,
        month: 0o1,
        year: 2000,
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    ></Formik>
  );
};

export default RegisterForm;
