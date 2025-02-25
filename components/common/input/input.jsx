"use client";
import { useState } from "react";
import styles from "./input.module.css";

export default function Input({
  type = "text",
  placeholder = "",
  defaultValue = "",
  maxLength = 10,
  isWrong = false,
  isDisabled = false,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <input
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={handleChangeValue}
      className={`${styles.input} ${isWrong ? styles.wrong : ""} ${isDisabled ? styles.disabled : ""}`}
      disabled={isDisabled}
    ></input>
  );
}

// type: "text", ""password", "time", "date"
// placeholder : string
// maxLength : {number}
// isWrong : {boolean}
// isDisabled : {boolean}
