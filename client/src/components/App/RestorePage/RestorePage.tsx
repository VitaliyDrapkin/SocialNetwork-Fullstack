import React from "react";
import { NavLink } from "react-router-dom";
import s from "./RestorePage.module.css";
import { Formik, Form, Field } from "formik";
import CustomInputComponent from "../../Helpers/formik/formControls/formControls";
import { validateEmail } from "../../Helpers/formik/validators/validators";

//--------------types-----------------

type RestorePageProps = {
  onRestorePassword(email: string): void;
};

type initialValuesType = {
  email: string;
};

type setErrorsType = {
  ({ email }: { email: string }): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

function RestorePage(props: RestorePageProps) {
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

export default RestorePage;
