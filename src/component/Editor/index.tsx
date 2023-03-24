import { Togonapshin } from "../../@types/togonapshin";
import idiotproof from "../../service/idiotproof";
import styles from "./index.module.scss";

interface Props extends Properties {
  togonapshinData: Togonapshin;
}
export default function Editor(properties: Props) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  return (
    <div id={id} className={cl}>
      <div>"{properties.togonapshinData.title}"</div>
      <div>{properties.togonapshinData.context}</div>
    </div>
  );
}
