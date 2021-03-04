import React from "react";
import { NavLink } from "react-router-dom";
import s from "./RegisterPage.module.css";
import { Formik, Form, Field } from "formik";
import {
  simpleValidateNames,
  validateBirthday,
  validateEmail,
  validatePassword,
} from "../../../services/validators";
import CustomInputComponent from "../../shared/CustomInput/formControls";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../API/UsersRequests";
import { actionsTypes, authorizationAC } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import { withAuthorizedRedirect } from "../../../hocs/withAuthorizedRedirect";

interface OwnProps {
  onRegistration(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: number,
    gender: string
  ): void;
}

interface PropsFromState {}

interface PropsFromDispatch {
  onRegistration(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: number,
    gender: string
  ): void;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

type initialValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: number;
  gender: string;
};

type setErrorsType = {
  ({ email }: { email: string }): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

function RegisterPage(props: AllProps) {
  //Formik Values state
  const initialValues: initialValuesType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: new Date().getTime(),
    gender: "Custom",
  };

  const onClickRegistration = async (
    value: initialValuesType,
    setErrors: setErrorsType,
    setSubmitting: setSubmittingType
  ) => {
    try {
      await props.onRegistration(
        value.firstName,
        value.lastName,
        value.email,
        value.password,
        value.birthday,
        value.gender
      );
      setSubmitting(false);
    } catch (error) {
      //throw here only this error
      setErrors({ email: "Email is already in use" });
      setSubmitting(false);
    }
  };

  return (
    <div className={s.registerPage}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onClickRegistration(values, setErrors, setSubmitting);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.header}>Facebook</div>
            <div className={s.main}>
              <div className={s.mainHeadline}>Create a New Account</div>
              <div className={s.inputHalf}>
                <Field
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  validate={simpleValidateNames}
                  component={CustomInputComponent}
                />
                <Field
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  validate={simpleValidateNames}
                  component={CustomInputComponent}
                />
              </div>
              <div className={s.input}>
                <Field
                  placeholder="Email"
                  type="email"
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
              <div className={s.birthday}>
                <div className={s.headline}>Birthday</div>
                <Field
                  max={new Date().toISOString().slice(0, 10)}
                  type="date"
                  name="birthday"
                  value={new Date(values.birthday).toISOString().slice(0, 10)}
                  onChange={handleChange}
                  validate={validateBirthday}
                  component={CustomInputComponent}
                />
              </div>
              <div className={s.gender}>
                <div className={s.headline}>Gender</div>
                <div className={s.radioBTNS} role="group">
                  <div>
                    <label>
                      <Field type="radio" value="Male" name="gender" />
                      Male
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field type="radio" value="Female" name="gender" />
                      Female
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field type="radio" value="Custom" name="gender" />
                      Custom
                    </label>
                  </div>
                </div>
              </div>
              <div className={s.loginBTN}>
                <button type="submit" disabled={isSubmitting}>
                  Registration
                </button>
              </div>
              <div className={s.navLinks}>
                <NavLink to="login">Already Registered? Click to login</NavLink>
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
    onRegistration: async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      birthday: number,
      gender: string
    ) => {
      try {
        const responseData = await UsersRequests.registration(
          firstName,
          lastName,
          email,
          password,
          new Date(birthday).getTime(),
          gender
        );
        dispatch(
          authorizationAC(
            responseData._id,
            firstName,
            lastName,
            new Date(birthday).getTime(),
            gender,
            responseData.accessToken
          )
        );
      } catch (error) {
        if (error.message === "Request failed with status code 601") {
          throw error;
        }
        alert("Server error");
      }
    },
  };
};

const connectRegisterPage = connect<{}, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

export default withAuthorizedRedirect(connectRegisterPage);
