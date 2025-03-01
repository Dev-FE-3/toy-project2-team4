"use client";
import { useState } from "react";
import styles from "./input.module.css";

/**
 * Input 컴포넌트 props
 *
 * @param { "text" | "password" | "time" | "date" } type - 입력 타입 (text, password, time, date 중 하나)
 * @param { string } placeholder - 입력란에 표시될 텍스트
 * @param { string } defaultValue - 기본값
 * @param { number } maxLength - 입력할 수 있는 최대 문자 길이
 * @param { boolean } isWrong - 오류 상태 여부 (true/false)
 * @param { boolean } isDisabled - 입력란 비활성화 여부 (true/false)
 * @param { (value: string) => void } onChange - 값 변경 시 호출될 함수 (상태 변경 함수)
 */

export default function Input({
  type = "text",
  placeholder = "",
  defaultValue = "",
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
      disabled={isDisabled}
      value={value}
      onChange={handleChangeValue}
      className={`${styles.input} ${isWrong ? styles.wrong : ""} ${isDisabled ? styles.disabled : ""}`}
    ></input>
  );
}
