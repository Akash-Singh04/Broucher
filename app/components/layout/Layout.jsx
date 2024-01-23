import React from "react";
import Header from "./Header";
import Leftbar from "./Leftbar";

export default function Layout({ children }) {
  return (
    <main>
      <Header />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <div
          style={{
            flex: 1,
            backgroundColor: "rgb(243, 243, 243)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
