import idiotproof from "../../service/idiotproof";
import styles from "./index.module.scss";
import sticker_select_img from "./sticker_select_img.svg";
export default function StickerModal(properties: Properties) {
  const id = [`_${idiotproof.trace(StickerModal)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  return (
    <div id={id} className={cl}>
      <img src={sticker_select_img} className="ButtonImg" />
    </div>
  );
}
