import React from "react";
import { NavLink } from "react-router-dom";
import s from "./RestorePage.module.css";
import { Formik, Form, Field } from "formik";
import CustomInputComponent from "../../shared/CustomInput/formControls";
import { validateEmail } from "../../../services/validators";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionsTypes } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import { withAuthorizedRedirect } from "../../../hocs/withAuthorizedRedirect";

interface OwnProps {
  onRestorePassword(email: string): void;
}

interface PropsFromState {}
interface PropsFromDispatch {
  onRestorePassword(email: string): void;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

type initialValuesType = {
  email: string;
};

type setErrorsType = {
  ({ email }: { email: string }): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

function RestorePage(props: AllProps) {
  //Formik Values state
  const initialValues: initialValuesType = {
    email: "",
  };

  const onClickRestorePassword = async (
    value: initialValuesType,
    setErrors: setErrorsType,
    setSubmitting: setSubmittingType
  ) => {
    try {
      await props.onRestorePassword(value.email);
    } catch (error) {
      //throw here only this error
      setErrors({ email: "Email not found" });
      setSubmitting(false);
    }
  };

  return (
    <div className={s.registerPage}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onClickRestorePassword(values, setErrors, setSubmitting);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.header}>Facebook</div>
            <div className={s.main}>
              <div className={s.mainHeadline}>Restore password</div>

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
              <div className={s.loginBTN}>
                <button type="submit" disabled={isSubmitting}>
                  Restore password
                </button>
              </div>
              <div className={s.navLinks}>
                <NavLink to="registration">Create new account</NavLink>
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
    onRestorePassword: async (email: string) => {
      alert(email);
    },
  };
};

const ConnectRestorePage = connect<{}, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(RestorePage);

export default withAuthorizedRedirect(ConnectRestorePage);
