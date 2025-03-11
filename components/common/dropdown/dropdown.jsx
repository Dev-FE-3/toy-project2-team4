"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.scss";
import Icon from "../icon/icon";

/**
 * @param {string[]} initialOptions - 드롭다운 옵션 리스트
 * @param {function} onSelect - 옵션 선택 시 실행할 콜백 함수
 * @param {string}[className] - 추가적인 커스텀 클래스
 * @param {string} defaultValue - 옵션 선택된 옵션 실행할 콜백 함수
 */

const Dropdown = ({ initialOptions = [], onSelect, className, defaultValue = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(defaultValue || "선택하기");
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (option) => {
    setSelectOption(option);
    if (onSelect) onSelect(option); // 부모 컴포넌트로 선택 값 전달
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`${styles.dropdownContainer} ${className}`}>
      <button onClick={() => setIsOpen((prev) => !prev)} className={`${styles.dropdown} ${className}`}>
        {selectOption}
        <Icon style="rounded" iconname="stat_minus_1" size="2rem" />
      </button>
      <div>
        {isOpen && (
          <div className={`${styles.dropdownList} ${className}`}>
            <ul>
              {initialOptions.map((option, index) => (
                <li
                  key={index}
                  className={`${styles.dropItem} ${className}`}
                  onClick={() => {
                    handleItemClick(option);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
