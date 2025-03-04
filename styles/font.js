import { Noto_Sans_KR } from "next/font/google";

export const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"], // 사용할 폰트 집합
  weight: ["400", "700"], // 사용할 폰트 두께
  display: "swap", // 폰트 다운로드 전까지 기본 폰트 표시(성능 최적화)
  variable: "--font-noto-sans-kr", // 사용할 CSS 변수 이름
});
