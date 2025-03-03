"use client";
import Button from "../../components/common/button/button";
import styles from "./modificationHistory.module.scss";

const ModificationHistory = () => {
  const datas = [
    {
      id: 16,
      date: "2025.02.20",
      reason: "업무 연장",
      content: "추가 수업한 부분에 대해서 정정을 신청...",
      status: "대기",
      cancel: true,
    },
    {
      id: 15,
      date: "2024.12.15",
      reason: "오류 수정",
      content: "출석 시간 오류로 인해 정정을 요청합니다.",
      status: "대기",
      cancel: true,
    },
    {
      id: 14,
      date: "2024.11.30",
      reason: "업무 연장",
      content: "추가 업무가 발생하여 정정 요청합니다.",
      status: "정정 완료",
      cancel: false,
    },
    {
      id: 13,
      date: "2024.10.25",
      reason: "이름 변경",
      content: "이름이 잘못 입력되어 정정 요청합니다.",
      status: "대기",
      cancel: true,
    },
    {
      id: 12,
      date: "2024.09.20",
      reason: "근무 시간 수정",
      content: "출근 시간이 잘못 기록되어 수정 요청합니다.",
      status: "정정 완료",
      cancel: false,
    },
    {
      id: 11,
      date: "2024.08.10",
      reason: "업무 연장",
      content: "추가 수업을 진행하여 정정을 요청합니다.",
      status: "대기",
      cancel: true,
    },
    {
      id: 10,
      date: "2024.07.05",
      reason: "출석 오류",
      content: "출석이 누락되어 정정을 요청합니다.",
      status: "정정 완료",
      cancel: false,
    },
    {
      id: 9,
      date: "2024.06.28",
      reason: "업무 연장",
      content: "추가 수업한 부분에 대해서 정정을 신청합니다.",
      status: "대기",
      cancel: true,
    },
  ];

  return (
    <main className={styles.container}>
      <p className={styles.totalCount}>
        총 <strong>{datas.length}</strong> 개
      </p>

      <table className={styles.table}>
        <thead className={styles.tableTitle}>
          <tr>
            <th>번호</th>
            <th>날짜</th>
            <th>사유</th>
            <th>내용</th>
            <th>상태</th>
            <th>취소</th>
          </tr>
        </thead>

        <tbody className={styles.tableContent}>
          {datas.length === 0 ? (
            <tr className={styles.noData}>
              <td colSpan={6} className={styles.noDataText}>
                정정 신청 내역이 없습니다.
              </td>
            </tr>
          ) : (
            datas.map((data) => (
              <tr key={data.id} className={styles.dataItem}>
                <td>{data.id}</td>
                <td>{data.date}</td>
                <td>{data.reason}</td>
                <td>{data.content}</td>
                {/* <td className={data.status === "대기" ? styles.pending : styles.complete}>{data.status}</td> */}
                <td className={`${styles.status} ${data.status === "대기" ? styles.pending : styles.complete}`}>
                  {data.status}
                </td>

                <td>
                  <Button color="red">삭제</Button>
                  {/* {data.cancel === true ? <Button color="red">삭제</Button>: <Button color="gray">삭제</Button>} */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
};
export default ModificationHistory;
