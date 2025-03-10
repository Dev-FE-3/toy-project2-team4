<<<<<<< HEAD:app/layout.js
"use client";

import Navigation from "../components/navigation/navigation.jsx";
import { notoSansKr } from "../styles/font.js";
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "./modificationHistory/redux/store";
=======
import "../styles/global.css";
import Navigation from "../components/navigation/navigation.jsx";
import CenteredLayout from "../components/centeredLayout/CenteredLayout.jsx";
import { notoSansKr } from "../styles/font.js";

export const metadata = {
  title: "그랑 코딩학원",
  description: "그랑 코딩학원 인트라넷 서비스",
};
>>>>>>> redux-setting:app/layout.jsx

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
      </head>
      <body className={notoSansKr.className}>
        <Navigation />
<<<<<<< HEAD:app/layout.js
        <Provider store={store}>{children}</Provider>
=======
        <CenteredLayout>{children}</CenteredLayout>
>>>>>>> redux-setting:app/layout.jsx
      </body>
    </html>
  );
}