import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Page1 from "./RegisterMultistepForm/Page1";
import Page2 from "./RegisterMultistepForm/Page2";
import Page3 from "./RegisterMultistepForm/Page3";
import { Button, Header } from "../Style/ComponentStyles/RegisterFormStyles";

interface Values {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  day: number;
  month: number;
  year: number;
  phone: string;
}
const Pages = [<Page1 />, <Page2 />, <Page3 />];
const RegisterForm = () => {
  const [page, setPage] = useState(0);
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        day: 0o1,
        month: 0o1,
        year: 2000,
        phone: "",
      }}
      validationSchema={yup.object({
        name: yup
          .string()
          .required("Name field is required")
          .max(32, "Name can be  32 letters long"),
        surname: yup
          .string()
          .required("Surname field is required")
          .max(50, "Surname can be  50 letters long"),
        email: yup
          .string()
          .required("Email is required")
          .email("Please pass valid email"),
        password: yup
          .string()
          .required("Password is required")
          .min(8, "Password must be atleast 8 characters long"),
        username: yup
          .string()
          .required("Username is required")
          .max(32, "Username can be  32 letters long"),
        day: yup
          .number()
          .required("Day is required")
          .min(1, "Day must be between 1 and 31")
          .max(31, "Day must be between 1 and 31"),
        month: yup
          .number()
          .required("Month is required")
          .min(1, "Choose month between 1 and 12")
          .max(12, "Choose month between 1 and 12"),
        year: yup
          .number()
          .required("Year is required")
          .min(1900, "Choose year between 1900 and 2020")
          .max(2020, "Choose year between 1900 and 2020"),
        phone: yup
          .string()
          .required("Phone is required")
          .length(9, "Phone number can be only 9 digits"),
      })}
      onSubmit={(values: Values, { setSubmitting }) => {
        console.log(values, setSubmitting);
        setSubmitting(false);
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Header first={page === 0 ? true : false}>
            {page > 0 && (
              <Button
                type="button"
                onClick={() => setPage((prevPage) => prevPage - 1)}
              >
                Prev
              </Button>
            )}

            {page < Pages.length - 1 &&
              (page === 0 ? (
                <Button
                  type="button"
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={
                    !touched.name ||
                    !touched.surname ||
                    errors.day ||
                    errors.month ||
                    errors.year ||
                    errors.name ||
                    errors.surname
                      ? true
                      : false
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={
                    !touched.email ||
                    !touched.password ||
                    !touched.phone ||
                    !touched.username ||
                    errors.email ||
                    errors.password ||
                    errors.phone ||
                    errors.username
                      ? true
                      : false
                  }
                >
                  Next
                </Button>
              ))}
          </Header>
          <h2 style={{ padding: "1rem 0" }}>Create your account</h2>

          {Pages[page]}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
