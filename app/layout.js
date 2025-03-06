"use client";

import Navigation from "../components/navigation/navigation.jsx";
import { notoSansKr } from "../styles/font.js";
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "./modificationHistory/redux/store";

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
      </head>
      <body className={notoSansKr.className}>
        <Navigation />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}