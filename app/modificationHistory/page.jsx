"use client";

import Button from "../../components/common/button/button";
import Dropdown from "../../components/common/dropdown/dropdown";

const modificationHistory = () => {
  const options = [
    "1번 옵션입니다.",
    "2번 옵션",
    "3번 옵션임",
    "4번 옵션입니다.",
    "5번 옵션입니다.",
    "6번 옵션입니다.",
  ];

  return (
    <>
      <div>정정 신청 내역 확인 페이지</div>
      <Dropdown initialOptions={options} />
      <div>
        <Button color="blue" onClick={(e) => console.log(e.target.dataset.num)} data-num="test1">
          확인
        </Button>
        <Button color="red" onClick={() => console.log("취소 버튼 클릭함")}>
          취소
        </Button>
        <Button color="yellow" onClick={() => console.log("정정 버튼 클릭함")}>
          정정
        </Button>
        <Button color="gray" onClick={() => console.log("삭제 버튼 클릭함")}>
          삭제
        </Button>
      </div>
    </>
  );
};
export default modificationHistory; 
