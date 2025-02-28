import style from "../modal/modal.module.scss";
import Button from "../button/button";

/*
onCancel : 취소 버튼 누르면 실행할 함수
onCheck : 확인 버튼 누르면 실행할 함수
title : 모달 안내창의 제목
titleIcon : 제목 왼쪽에 붙을 아이콘
checkButtonColor : 확인 버튼 색상 지정 red | blue | gray | yellow
children : 전달할 내용 
showCancelButton : 취소 버튼 유무 true | false
*/

const Modal = ({ onCancel, onCheck, title, titleIcon, checkButtonColor, children, showCancelButton }) => {
  let setButton;

  if (showCancelButton) {
    setButton = (
      <>
        <Button color={checkButtonColor} onClick={onCheck}>
          확인
        </Button>
        <Button color="gray" onClick={onCancel}>
          취소
        </Button>
      </>
    );
  } else {
    setButton = (
      <Button color={checkButtonColor} onClick={onCheck}>
        확인
      </Button>
    );
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
