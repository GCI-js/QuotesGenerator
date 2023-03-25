import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor";
import TemporalBoard from "./component/TemporalBoard";
import { useState } from "react";

import styles from "./App.module.scss";
import quotes from "./resource/quotes.json";
import TitleHeader from "./component/TItleHeader";
import share_img from "./share_img.svg";
import desktop_img from "./desktop_img.svg";
import BottomInfo from "./component/BottomInfo";
import DesktopBottomInfo from "./component/DesktopBottomInfo";

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
      title: "한줄글귀정원",
      text: "당신의 마음을 따뜻하게 해주는 한마디",
      url: "한줄글귀정원.com",
    };
    // console.log("navigator....", navigator.canShare(data));

    try {
      if (navigator.canShare(data)) {
        await navigator.share(data);
      } else {
        alert("해당 브라우저는 공유하기를 지원하지 않습니다.");
      }
    } catch (exception) {
      alert("해당 브라우저는 공유하기를 지원하지 않습니다.");
    }
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
          <img
            className="desktopShare"
            src={share_img}
            onClick={() => shareClicked()}
          ></img>
          <TemporalBoard randomText={randomText} />
          <DesktopBottomInfo />
        </div>
      </div>
    </div>
  ) : (
    <div id={id} className={cl}>
      <TitleHeader />
      <Editor quote={quote} />
      <img
        className="Share"
        src={share_img}
        onClick={() => shareClicked()}
      ></img>
      <TemporalBoard randomText={randomText} />
      <BottomInfo />
    </div>
  );
}
