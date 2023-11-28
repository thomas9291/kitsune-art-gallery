import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [art, setArt] = useState("");

  return <Component art={art} setArt={setArt} {...pageProps} />;
}
