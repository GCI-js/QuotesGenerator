import idiotproof from "./service/idiotproof";

import Editor from "./component/Editor"
import TemporalBoard from "./component/TemporalBoard";

import styles from "./App.module.scss";


export default function App(properties: Properties) {

  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  return <div id={id} className={cl}>
    <Editor/>
    <TemporalBoard/>
  </div>
}
