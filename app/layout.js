import Navigation from "../components/navigation/navigation.jsx";
import { notoSansKr } from "../styles/font.js";
import "../styles/global.css";
import ProtectedRoute from "../components/protectedroute/protectedroute.jsx";
export const metadata = {
  title: "그랑 코딩학원",
  description: "그랑 코딩학원 인트라넷 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
      </head>
      <body className={notoSansKr.className}>
        <Navigation />
        <ProtectedRoute>{children}</ProtectedRoute>
      </body>
    </html>
  );
}
