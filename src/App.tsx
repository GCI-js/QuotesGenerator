import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor";
import TemporalBoard from "./component/TemporalBoard";
import { useState } from "react";

import styles from "./App.module.scss";
import quotes from "./resource/quotes.json";
import TitleHeader from "./component/TItleHeader";
import desktop_img from "./desktop_img.svg";
import BottomInfo from "./component/BottomInfo";
import DesktopBottomInfo from "./component/DesktopBottomInfo";

export default function App(properties: Properties) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const i = Math.floor(Math.random() * 100000) % quotes.length;
  const [quote, setQuote] = useState(quotes[i]);
  var isMobile = /Mobi/i.test(window.navigator.userAgent);

  function randomText() {
    setQuote(quotes[Math.floor(Math.random() * 100000) % quotes.length]);
  }

  return !isMobile ? (
    <div id={id} className={cl}>
      <div className="forDesktop">
        <div className="desktopTitle">
          <TitleHeader />
        </div>
        <div className="desktopImg">
          <img src={desktop_img}></img>
        </div>
        <div className="inPhone">
          <Editor quote={quote} />
          <TemporalBoard randomText={randomText} />
          <DesktopBottomInfo />
        </div>
      </div>
    </div>
  ) : (
    <div id={id} className={cl}>
      <TitleHeader />
      <Editor quote={quote} />
      <TemporalBoard randomText={randomText} />
      <BottomInfo />
    </div>
  );
}
