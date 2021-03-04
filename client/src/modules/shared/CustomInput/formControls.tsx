import React from "react";
import s from "./formControls.module.css";

type CustomInputComponentType = {
  field: { name: string };
  form: {
    touched: { [key: string]: boolean[] };
    errors: { [key: string]: string[] };
  };
  props: { placeholder: string; type: string; value: string };
};

export default function CustomInputComponent({
  field,
  form: { touched, errors },
  ...props
}: CustomInputComponentType) {
  return (
    <div className={s.formControl}>
      {errors[field.name] && touched[field.name] && (
        <div className={s.errorField}>{errors[field.name]}</div>
      )}
      <input
        {...field}
        {...props}
        className={
          errors[field.name] && touched[field.name] ? s.errorInput : null
        }
      />
    </div>
  );
}
