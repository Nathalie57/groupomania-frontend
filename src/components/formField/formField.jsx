import React from "react";

const FormField = ({
  name,
  label,
  value,
  onChange,
  span,
  type = "text",
  placeholder= "",
  onClick
}) => (
  <li>
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      onClick={onClick}
    />
    <span>{span}</span>
  </li>
);

export default FormField;
