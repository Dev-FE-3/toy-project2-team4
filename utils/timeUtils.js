// 날짜를 "YYYY.MM.DD" 형식으로 반환하는 함수
export const formatSimpleDate = (date) => {
  if (!date || isNaN(new Date(date))) {
    return; // 유효하지 않은 경우
  }
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
