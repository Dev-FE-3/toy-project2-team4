import "../styles/global.css";
import Navigation from "../components/navigation/navigation.jsx";
import CenteredLayout from "../components/centeredLayout/CenteredLayout.jsx";
import { notoSansKr } from "../styles/font.js";
import ReduxProvider from "../store/reduxProvider";

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
        <ReduxProvider>
          <Navigation />
          <CenteredLayout>{children}</CenteredLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
