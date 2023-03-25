import { useEffect, useState } from "react";
import idiotproof from "../../service/idiotproof";
import calligraphy from "../../service/calligraphy";

import styles from "./index.module.scss";
interface Props extends Properties {
  title: string;
}

export default function Title(properties: Props) {
  const id = [`_${idiotproof.trace(Title)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const title = properties.title;
  const [titleStyle, setTitleStyle] = useState<any>();
  const [titleBackStyle, setTitleBackStyle] = useState<any>();
  calligraphy.enroll(setTitleStyle, setTitleBackStyle, "title");
  useEffect(() => calligraphy.t_shuffle(), []);
  return (
    <div id={id} className={cl}>
      <div className="titleBack" style={titleBackStyle}>
        {title}
      </div>
      <div className="title" style={titleStyle}>
        {title}
      </div>
    </div>
  );
}
