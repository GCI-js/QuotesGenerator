import { useEffect, useState } from "react";
import idiotproof from "../../service/idiotproof";
import calligraphy from "../../service/calligraphy"

import styles from "./index.module.scss";
interface Props extends Properties {
  context: string;
}

export default function Context(properties: Props) {
  const id = [`_${idiotproof.trace(Context)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const context = properties.context;
  const [contextStyle, setContextStyle] = useState<any>();
  const [contextBackStyle, setContextBackStyle] = useState<any>();
  calligraphy.enroll(setContextStyle, setContextBackStyle, "context");
  useEffect(() => calligraphy.c_shuffle(), []);
  return (
    <div id={id} className={cl}>
      <div className="contextBack" style={contextBackStyle}>
        {context}
      </div>
      <div className="context" style={contextStyle}>
        {context}
      </div>
    </div>
  );
}
