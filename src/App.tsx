import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor";
import TemporalBoard from "./component/TemporalBoard";
import { useState } from "react";

import styles from "./App.module.scss";
import MockTogonapshin from "./mock_data/mock_togonapshin.json";
import StickerModal from "./component/StickerModal";
import Title from "./component/title";

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
      {/* <Title /> */}
      <Editor />
      {/* <StickerModal></StickerModal> */}
      <TemporalBoard randomText={randomText} />
    </div>
  );
}
