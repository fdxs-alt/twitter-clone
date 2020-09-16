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
        day: 0o1,
        month: 0o1,
        year: 2000,
        phone: "",
      }}
      validationSchema={yup.object({
        name: yup.string().required("This field is required"),
        surname: yup.string().required("This field is required"),
        email: yup
          .string()
          .required("This filed is required")
          .email("Please pass valid email"),
        username: yup.string().required("This filed is required"),
        day: yup.number().min(1).max(31, "Day must be between 1 and 31"),
        month: yup
          .number()
          .min(1, "Choose between 1 and 12")
          .max(12, "Choose between 1 and 12"),
        year: yup
          .number()
          .min(1900, "Choose between 1900 and 2020")
          .max(2020, "Choose between 1900 and 2020"),
        phone: yup
          .string()
          .required("This field is required")
          .length(9, "Phone number can be only 9 digits"),
      })}
      onSubmit={(values: Values, { setSubmitting }) => {
        console.log(values, setSubmitting);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
          <Header first={page === 0 ? true : false}>
            {page > 0 && (
              <Button
                type="button"
                onClick={() => setPage((prevPage) => prevPage - 1)}
              >
                Prev
              </Button>
            )}

            {page < Pages.length - 1 && (
              <Button
                type="button"
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                Next
              </Button>
            )}
          </Header>

          {page === Pages.length - 1 && <button type="submit">Submit</button>}
          {Pages[page]}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
