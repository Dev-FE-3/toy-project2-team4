"use client";
// import { useState } from "react";
import Button from "../../components/common/button/button";

const modificationHistory = () => {
  // const [options, setOption] = useState([])
  const datas = [
    {
      id: 16,
      date: "2025.02.20",
      reason: "업무 연장",
      content: "추가 수업한 부분에 대해서 정정을 신청...",
      status: "대기",
    },
    {
      id: 15,
      date: "2024.02.20",
      reason: "업무 연장",
      content: "추가 수업한 부분에 대해서 정정을 신청...",
      status: "대기",
    },
    {
      id: 14,
      date: "2023.02.20",
      reason: "업무 연장",
      content: "추가 수업한 부분에 대해서 정정을 신청...",
      status: "정정 완료",
    },
  ];
  return (
    <main className="">
      <p>
        총 <strong>{datas.length}</strong> 개
      </p>

      {datas.length === 0 ? (
        <p className="noData">정정 신청 내역이 없습니다.</p>
      ) : (
        <table>
          <thead className="listTitle">
            <tr>
              <th>번호</th>
              <th>날짜</th>
              <th>내용</th>
              <th>사유</th>
              <th>상태</th>
              <th>취소</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.date}</td>
                <td>{data.reason}</td>
                <td>{data.content}</td>
                <td>{data.status}</td>
                <td>
                  <Button color="red">삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};
export default modificationHistory;

