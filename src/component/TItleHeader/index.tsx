import idiotproof from "../../service/idiotproof";
import styles from "./index.module.scss";
import title_img from "./title_img.svg";
export default function TitleHeader(properties: Properties) {
  const id = [`_${idiotproof.trace(TitleHeader)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  return (
    <div id={id} className={cl}>
      <img src={title_img} className="titleImg"></img>
    </div>
  );
}
