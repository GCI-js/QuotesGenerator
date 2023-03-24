import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor";
import TemporalBoard from "./component/TemporalBoard";
import React, { useState, useCallback } from "react";

import styles from "./App.module.scss";
import MockTogonapshin from "./mock_data/mock_togonapshin.json";
import StickerModal from "./component/StickerModal";

export default function App(properties: Properties) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const [togonapshinData, setTogonapshinData] = useState({
    ...MockTogonapshin[0],
  });

  function randomText() {
    let randomIndex = Math.floor(Math.random() * MockTogonapshin.length);
    setTogonapshinData(MockTogonapshin[randomIndex]);
  }

  return (
    <div id={id} className={cl}>
      <Editor togonapshinData={togonapshinData} />
      {/* <StickerModal></StickerModal> */}
      <TemporalBoard randomText={randomText} />
    </div>
  );
}
