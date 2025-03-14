import { http, HttpResponse } from "msw";

import paymentHistoryData from "./data/paymentData.json";
import classCalendarData from "./data/classCalendarData.json";
import { getFromDB, saveToDB } from "../utils/indexedDBUtils";

export const handlers = [
  // Next.js telemetry API에 대한 요청을 무시하는 핸들러
  http.get("https://telemetry.nextjs.org/api/v1/record/*", () => {
    return HttpResponse.json({});
  }),

  http.get("http://localhost:3000/api/paymentHistory", async () => {
    const key = "paymentHistory"; // 특정 키로 데이터 조회
    const storedData = await getFromDB(key);
    console.log("get");
    if (storedData && Array.isArray(storedData.data)) {
      return HttpResponse.json({ success: true, data: storedData.data });
    }
    // IndexedDB에 데이터가 없으면 초기 JSON 데이터 반환 후 저장
    await saveToDB(key, paymentHistoryData);
    return HttpResponse.json(paymentHistoryData);
  }),

  http.get("http://localhost:3000/api/ModificationHistory", () => {
    return HttpResponse.json(paymentHistoryData);
  }),

  // DELETE 요청: 특정 id에 해당하는 paymentHistory 삭제
  http.delete("http://localhost:3000/api/paymentHistory/:id", async ({ params }) => {
    const { id } = params;
    const key = "paymentHistory";
    console.log("id:", id);
    const storedData = await getFromDB(key);

    if (!storedData) {
      return new HttpResponse(null, { status: 404 });
    }

    const itemToDelete = storedData.find((item) => item.id === parseInt(id));

    if (itemToDelete) {
      const updatedData = storedData.filter((item) => item.id !== parseInt(id));
      await saveToDB("paymentHistory", { data: updatedData }); // 변경된 데이터를 저장

      return new HttpResponse({
        status: 200,
        message: `Data with id ${id} deleted successfully`,
      });
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),

  // PUT 요청: 특정 id에 해당하는 paymentHistory 수정
  http.put("http://localhost:3000/api/paymentHistory/:id", async ({ params, request }) => {
    const { id } = params;
    console.log(request, "req");
    const updatedPaymentHistory = await request.json(); // 클라이언트에서 전달한 수정 데이터
    const key = "paymentHistory";

    const storedData = await getFromDB(key);

    if (!storedData) {
      return new HttpResponse(null, { status: 404, message: "No data found" });
    }

    const index = storedData.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      return new HttpResponse(null, { status: 404, message: `No data found with id ${id}` });
    }

    // 기존 데이터를 수정
    storedData[index] = { ...storedData[index], ...updatedPaymentHistory };

    // 수정된 데이터를 IndexedDB에 저장
    await saveToDB(key, { data: storedData });

    return new HttpResponse({
      status: 200,
      message: `Data with id ${id} updated successfully`,
      body: { success: true, data: storedData[index] },
    });
  }),

  // classCalender (수업 목록)
  http.get("http://localhost:3000/api/classCalendar", () => {
    return HttpResponse.json(classCalendarData);
  }),
];
