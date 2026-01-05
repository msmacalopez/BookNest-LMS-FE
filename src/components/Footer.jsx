import React from "react";
import { COLORS } from "../../theme.js";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: COLORS.dark,
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
        minHeight: "10vh",
      }}
    >
      {new Date().getFullYear()} BookNest. &copy; All rights reserved.
    </footer>
  );
}
