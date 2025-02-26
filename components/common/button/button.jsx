import React from "react";
import styles from "./button.module.css";

/**
 * 공통 Button 컴포넌트
 * @param {string} color - 버튼 스타일(ex. 'red', 'yellow', 'blue', 'gray')
 * @param {string} type - 버튼 타입 (ex. 'button', 'submit', 'reset')
 * @param {function} onClick - 클릭 이벤트 핸들러
 * children: 버튼 내부에 들어갈 내용. 기본값은 "버튼"
 * ...rest: 기본 값으로 받는 porp이외의 값을 받을 수 있음
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
