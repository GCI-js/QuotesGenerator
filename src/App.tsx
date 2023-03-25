import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor";
import TemporalBoard from "./component/TemporalBoard";
import { useState } from "react";

import styles from "./App.module.scss";
import MockTogonapshin from "./mock_data/mock_togonapshin.json";
import TitleHeader from "./component/TItleHeader";
import desktop_img from "./desktop_img.svg";
import share_img from "./share_img.svg";

export default function App(properties: Properties) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const [togonapshinData, setTogonapshinData] = useState({
    ...MockTogonapshin[0],
  });
  var isMobile = /Mobi/i.test(window.navigator.userAgent);

  function randomText() {
    let randomIndex = Math.floor(Math.random() * MockTogonapshin.length);
    setTogonapshinData(MockTogonapshin[randomIndex]);
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
      <Editor />
      <img
        className="Share"
        src={share_img}
        onClick={() => shareClicked()}
      ></img>
      <TemporalBoard randomText={randomText} />
    </div>
  );
}
