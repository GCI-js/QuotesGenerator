import { useEffect, useState } from "react";
import idiotproof from "../../service/idiotproof";
import calligraphy from "../../service/calligraphy";
import styles from "./index.module.scss";

export default function Watermark(properties: Properties) {
  const id = [`_${idiotproof.trace(Watermark)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const [wmkStyle, setWmkStyle] = useState<any>();
  calligraphy.enroll(setWmkStyle, null, "");
  useEffect(() => calligraphy.w_shuffle(), []);
  return (
    <div id={id} className={cl}>
      <div className="wmkBack" style={wmkStyle}>
        한줄글귀정원
      </div>
      <div className="wmk" style={wmkStyle}>
        한줄글귀정원
      </div>
    </div>
  );
}
