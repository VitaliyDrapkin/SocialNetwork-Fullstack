import React from "react";
import { NavLink } from "react-router-dom";
import s from "./LoginPage.module.css";
import { Formik, Form, Field } from "formik";
import CustomInputComponent from "../../../components/Helpers/formik/formControls/formControls";
import {
  validateEmail,
  validatePassword,
} from "../../../components/Helpers/formik/validators/validators";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../API/UsersRequests";
import { actionsTypes, authorizationAC } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import { withAuthorizedRedirect } from "../../../components/Helpers/hoc/withAuthorizedRedirect";

interface OwnProps {
  onLogin(login: string, password: string): void;
}

interface PropsFromState {}

interface PropsFromDispatch {
  onLogin(login: string, password: string): void;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

//Formik types
type initialValuesType = {
  email: string;
  password: string;
};

type setErrorsType = {
  ({ email, password }: initialValuesType): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

function LoginPage(props: AllProps) {
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

const mapStateToProps = (state: RootState): {} => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    onLogin: async (email: string, password: string) => {
      try {
        const responseData = await UsersRequests.login(email, password);
        dispatch(
          authorizationAC(
            responseData._id,
            responseData.firstName,
            responseData.lastName,
            responseData.birthday,
            responseData.gender,
            responseData.accessToken,
            responseData.profileImg
          )
        );
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          throw error;
        }
        alert("server error");
      }
    },
  };
};

const connectLoginPage = connect<{}, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default withAuthorizedRedirect(connectLoginPage);
