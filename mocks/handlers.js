import { http, HttpResponse } from "msw";

import paymentHistoryData from "./data/paymentData.json";

const allPosts = new Map();

export const handlers = [
  // Next.js telemetry API에 대한 요청을 무시하는 핸들러
  http.get("https://telemetry.nextjs.org/api/v1/record/*", () => {
    return HttpResponse.json({});
  }),

  http.get("http://localhost:3000/api/paymentHistory", () => {
    return HttpResponse.json(paymentHistoryData);
  }),

  http.get("http://localhost:3000/api/ModificationHistory", () => {
    return HttpResponse.json(paymentHistoryData);
  }),

  //POST 요청은 동작만 확인
  http.post("http://localhost:3000/api/paymentHistory", async ({ request }) => {
    const newPost = await request.json();
    allPosts.set(newPost.id, newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),
];
