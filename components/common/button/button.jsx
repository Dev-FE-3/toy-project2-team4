import React from "react";
import styles from "./button.module.css";

/**
 * @param {string} color - 버튼 스타일 (ex. 'red', 'yellow', 'blue', 'gray')
 * @param {string} type - 버튼 타입 (ex. 'button', 'submit', 'reset')
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {React.ReactNode} [children="버튼"] - 버튼 내부에 들어갈 내용 (기본값: "버튼")
 * @param {Object} rest - 기본값으로 받는 prop 이외의 추가적인 속성
 */


const Button = ({ color = "blue", children = "버튼", type = "button", onClick, ...rest }) => {
  const className = [styles.btn, styles[color]].filter(Boolean).join(" ");

  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
