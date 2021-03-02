import React from "react";
import { NavLink } from "react-router-dom";
import s from "./LoginPage.module.css";
import { Formik, Form, Field } from "formik";
import CustomInputComponent from "../../components/Helpers/formik/formControls/formControls";
import {
  validateEmail,
  validatePassword,
} from "../../components/Helpers/formik/validators/validators";

//-------------types--------------
type LoginFormikProps = {
  onLogin(login: string, password: string): void;
};

type initialValuesType = {
  email: string;
  password: string;
};

type setErrorsType = {
  ({ email, password }: initialValuesType): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

function LoginPage(props: LoginFormikProps) {
  //Formik values state
  const initialValues: initialValuesType = { email: "", password: "" };

  const onClickLogin = async (
    value: initialValuesType,
    setErrors: setErrorsType,
    setSubmitting: setSubmittingType
  ) => {
    try {
      await props.onLogin(value.email, value.password);
      setSubmitting(false);
    } catch (error) {
      //if authorization Error show to use
      setErrors({
        email: "Incorrect email or password",
        password: "Incorrect username or password",
      });
      //Allow button click
      setSubmitting(false);
    }
  };
  return (
    <div className={s.loginPage}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onClickLogin(values, setErrors, setSubmitting);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.header}>Facebook</div>
            <div className={s.main}>
              <div className={s.mainHeadline}>Log into Facebook</div>
              <div className={s.input}>
                <Field
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  validate={validateEmail}
                  component={CustomInputComponent}
                />
              </div>
              <div className={s.input}>
                <Field
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  validate={validatePassword}
                  component={CustomInputComponent}
                />
              </div>
              <div className={s.loginBTN}>
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </div>
              <div className={s.navLinks}>
                <NavLink to="./restore">Forgot password?</NavLink>
                <NavLink to="./registration">Create new account</NavLink>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
