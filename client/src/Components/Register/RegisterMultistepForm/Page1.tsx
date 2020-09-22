import { ErrorMessage, Field } from "formik";
import React from "react";
import {
  Input,
  InputWrapper,
  Label,
} from "../../../Style/ComponentStyles/LoginPageStyles";
import {
  PageOneWrapper,
  DateInfo,
  DateInputWrapper,
  Error,
} from "../../../Style/ComponentStyles/RegisterFormPagesStyle";

const Page1 = () => {
  return (
    <PageOneWrapper>
      <InputWrapper>
        <ErrorMessage name="name" render={(msg) => <Error>{msg}</Error>} />
        <Field name="name" as={Input} />
        <Label htmlFor="name">Name</Label>
      </InputWrapper>
      <InputWrapper>
        <ErrorMessage name="surname" render={(msg) => <Error>{msg}</Error>} />
        <Field name="surname" as={Input} />
        <Label htmlFor="surname">Surname</Label>
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
            <Label htmlFor="day">Day</Label>
          </InputWrapper>
          <InputWrapper>
            <Field name="month" as={Input} />
            <Label htmlFor="month">Month</Label>
          </InputWrapper>
          <InputWrapper style={{ marginRight: "0" }}>
            <Field name="year" as={Input} />
            <Label htmlFor="year">Year</Label>
          </InputWrapper>
        </DateInputWrapper>
        <ErrorMessage name="day" render={(msg) => <Error>{msg}</Error>} />
        <ErrorMessage name="month" render={(msg) => <Error>{msg}</Error>} />
        <ErrorMessage name="year" render={(msg) => <Error>{msg}</Error>} />
      </div>
    </PageOneWrapper>
  );
};

export default Page1;
