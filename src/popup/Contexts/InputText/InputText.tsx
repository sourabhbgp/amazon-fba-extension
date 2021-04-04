import React from "react";
import "./InputText.css";

/**
 * type : Text ,Email, Password
 *
 */

interface Props {
  type: string;
  name: string;
  className?: string;
  disabled?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  value?: string;
  errors: any;
  isError?: boolean;
}

export const InputText: React.FC<Props> = React.memo(
  ({
    type,
    name,
    className,
    placeholder,
    disabled,
    onChange,
    id,
    value,
    errors,
    isError,
  }) => {
    return (
      <div className={`${className} input-wraper  `}>
        <input
          type={type}
          className={`form-control ${
            (errors && errors[name]) || isError ? "is--error-focus" : ""
          }`}
          placeholder={placeholder}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
    );
  }
);

InputText.defaultProps = {
  type: "text",
  className: "",
  placeholder: "",
  disabled: false,
  id: "",
  isError: false,
};
