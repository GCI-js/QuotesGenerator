import { useEffect, useState } from "react";
import idiotproof from "../../service/idiotproof";

import styles from "./index.module.scss";
interface Props extends Properties {
  context: string;
}

const fontOptions = [
  { fontFamily: "Noto Serif KR", fontWeight: 400 },
  { fontFamily: "Noto Serif KR", fontWeight: 500 },
  { fontFamily: "Noto Serif KR", fontWeight: 700 },
  { fontFamily: "Noto Sans KR", fontWeight: 400 },
  { fontFamily: "Noto Sans KR", fontWeight: 500 },
  { fontFamily: "Noto Sans KR", fontWeight: 700 },
  { fontFamily: "Gothic A1", fontWeight: 400 },
  { fontFamily: "Gothic A1", fontWeight: 500 },
  { fontFamily: "Gothic A1", fontWeight: 700 },
  { fontFamily: "Gaegu", fontWeight: 300 },
  { fontFamily: "Gaegu", fontWeight: 400 },
  { fontFamily: "Gaegu", fontWeight: 700 },
  { fontFamily: "Single Day", fontWeight: 400 },
];

type RGB = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
}

function euclideanDistance(rgb1: RGB, rgb2: RGB): number {
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function colorDistance(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  return euclideanDistance(rgb1, rgb2);
}

export default function Context(properties: Props) {
  const id = [`_${idiotproof.trace(Context)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const context = properties.context;
  const [contextStyle, setContextStyle] = useState<any>();
  const [contextBackStyle, setContextBackStyle] = useState<any>();
  const shuffle = async () => {
    let rand = Math.round(Math.random() * 10000000000);
    let startColor = rand.toString(16).slice(-6);
    let endColor = rand.toString(16).slice(-6);
    while (colorDistance(startColor, endColor) < 200) {
      rand = Math.round(Math.random() * 10000000000);
      endColor = rand.toString(16).slice(-6);
    }
    let textShadow = {
      x: rand % 8,
      y: (rand / 8) % 8,
      blur: (rand / 64) % 8,
    };
    let fontFamily = fontOptions[rand % 12].fontFamily;
    let fontWeight = fontOptions[rand % 12].fontWeight;
    let strokeSize = (rand % 4) + 1;
    let strokeColor =
      rand % 3 == 0 ? "transparent" : rand % 3 == 1 ? "white" : "black";
    if (strokeColor == "transparent") strokeSize = 0;
    console.log(`rand:${rand}, radn%3==${rand % 3}`);
    let tmpContextStyle = {
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      backgroundImage: `linear-gradient(180deg, #${startColor} 0%, #${endColor} 100%)`,
    };
    let tmpContextBackStyle = {
      ...tmpContextStyle,
      WebkitTextStroke: `${strokeSize}px ${strokeColor}`,
    };
    setContextStyle(tmpContextStyle);
    setContextBackStyle(tmpContextBackStyle);
  };
  useEffect(() => {
    shuffle();
  }, []);
  return (
    <div id={id} className={cl}>
      <div className="contextBack" style={contextBackStyle}>
        {context}
      </div>
      <div className="context" style={contextStyle}>
        {context}
      </div>
      <button onClick={() => shuffle()} />
    </div>
  );
}
