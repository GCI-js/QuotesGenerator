import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor";
import TemporalBoard from "./component/TemporalBoard";
import { useState } from "react";

import styles from "./App.module.scss";
import quotes from "./resource/quotes.json";
import TitleHeader from "./component/TItleHeader";
import share_img from "./share_img.svg";

export default function App(properties: Properties) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const [quote, setQuote] = useState(quotes[0]);
  var isMobile = /Mobi/i.test(window.navigator.userAgent);

  function randomText() {
    let randIndex = Math.floor(Math.random() * 100000) % quotes.length;
    setQuote(quotes[randIndex]);
  }

  async function shareClicked() {
    console.log("shareClicked....");
    //navigator.share가 지원되는 경우
    let data = {
      title: "test",
      //text: '',
      url: "www.naver.com",
    };
    console.log("navigator....", navigator.canShare(data));

    if (navigator.canShare(data)) {
      await navigator.share(data);
    } else {
      alert("해당 브라우저는 공유하기를 지원하지 않습니다.");
    }
  }

  return (
    <div id={id} className={cl}>
      <TitleHeader />
      {/* {!isMobile && (
        <div className="forDesktop">
          <img src={desktop_img}></img>
        </div>
      )} */}
      <Editor quote={quote} />
      <img
        className="Share"
        src={share_img}
        onClick={() => shareClicked()}
      ></img>
      <TemporalBoard randomText={randomText} />
    </div>
  );
}
