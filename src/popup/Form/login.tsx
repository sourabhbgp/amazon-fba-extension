import React from "react";
import { Formik, Form, FormikErrors } from "formik";
import { InputText } from "../Contexts/InputText/InputText";

interface Props {
  onLogin: Function;
}

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const initalValues: LoginValues = { email: "", password: "" };

  return (
    <Formik
      initialValues={initalValues}
      validate={(values) => {
        let errors: FormikErrors<LoginValues> = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) errors.password = "Required";

        return errors;
      }}
      onSubmit={(values) => onLogin(values)}
    >
      {({ errors, isSubmitting, setFieldValue }) => (
        <Form style={{ width: "100%" }}>
          <InputText
            name="email"
            type="email"
            errors={errors}
            placeholder="Enter your work email"
            onChange={(e) => setFieldValue("email", e.target.value)}
          />

          <InputText
            name="password"
            type="password"
            errors={errors}
            placeholder="Password"
            onChange={(e) => setFieldValue("password", e.target.value)}
          />

          <button
            style={{ width: "100%" }}
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
