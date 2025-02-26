import Icon from "../icon/icon";
import style from "../modal/modal.module.css";

/*
onCancel : 취소 버튼 누르면 실행할 함수
onCheck : 확인 버튼 누르면 실행할 함수
title : 모달 안내창의 제목
titleIcon : 제목 왼쪽에 붙을 아이콘
children : 전달할 내용 
showCancelButton : 취소 버튼 유무
*/

const Modal = ({ onCancel, onCheck, title, titleIcon, children, showCancelButton }) => {
  let setButton;

  if (showCancelButton) {
    setButton = (
      <>
        <button onClick={onCheck}>확인</button>
        <button onClick={onCancel}>취소</button>
      </>
    );
  } else {
    setButton = <button onClick={onCheck}>확인</button>;
  }

  return (
    <>
      <div className={`${style.overlay}`}>
        <article className={`${style.modal}`}>
          <div className={style.column1}>
            <div className={style.icon}>{titleIcon}</div>
          </div>

          <div className={style.column2}>
            <div className={style.contentWrapper}>
              <div className={style.headerIconWrapper}>
                <header className={style.header}>{title}</header>
                <Icon iconname="close" size="2rem" color="black"></Icon>
              </div>
              <section className={style.modalBody}>{children}</section>
            </div>

            <footer className={style.modalFooter}>{setButton}</footer>
          </div>
        </article>
      </div>
    </>
  );
};

export default Modal;
