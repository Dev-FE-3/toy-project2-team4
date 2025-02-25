import Navigation from "../components/navigation/navigation.jsx";
import { notoSansKr } from "../styles/font.js";
import "../styles/global.css";

export const metadata = {
  title: "그랑 코딩학원",
  description: "그랑 코딩학원 인트라넷 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={notoSansKr.className}>
        <Navigation />

        {children}
      </body>
    </html>
  );
}
