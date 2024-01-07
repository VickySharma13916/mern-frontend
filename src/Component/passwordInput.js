import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BiShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ type, label, register, errors }) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <Form.Group className="mb-4 position-relative">
      <input type={inputType} label={label} {...register} />
      <label>{label}</label>
      <span
        className="position-absolute top-50 end-0 me-3 translate-middle-y"
        onClick={togglePasswordVisibility}
      >
        {inputType === "password" ? (
          <BiShow size={20} color="#bfbfbf" />
        ) : (
          <FaEyeSlash size={20} color="#bfbfbf" />
        )}
      </span>
      {errors && <span className="input-error">{errors.message}</span>}
    </Form.Group>
  );
};

export default PasswordInput;
