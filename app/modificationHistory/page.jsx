"use client";

import Button from "@components/common/button/button";

const modificationHistory = () => {
  return (
    <div>
      정정 신청 내역 확인 페이지
      <Button color="gray" onClick={() => console.log("삭제 버튼 클릭함")}>
        삭제
      </Button>
    </div>
  );
};
export default modificationHistory;
