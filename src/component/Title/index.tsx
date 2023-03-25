import { useEffect, useState } from "react";
import idiotproof from "../../service/idiotproof";

import styles from "./index.module.scss";
interface Props extends Properties {
  title: string;
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

function RGBToHex(r: number, g: number, b: number) {
  let rS = r.toString(16);
  let gS = g.toString(16);
  let bS = b.toString(16);

  if (rS.length === 1) rS = "0" + rS;
  if (gS.length === 1) gS = "0" + gS;
  if (bS.length === 1) bS = "0" + bS;

  return `${rS}${gS}${bS}`;
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

function colorMix(color1: string, color2: string) {
  const x: RGB = hexToRgb(color1);
  const y: RGB = hexToRgb(color2);

  const r = Math.round((x.r + y.r) / 2);
  const g = Math.round((x.g + y.g) / 2);
  const b = Math.round((x.b + y.b) / 2);

  return RGBToHex(r, g, b);
}

export default function Title(properties: Props) {
  const id = [`_${idiotproof.trace(Title)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const title = properties.title;
  const [titleStyle, setTitleStyle] = useState<any>();
  const [titleBackStyle, setTitleBackStyle] = useState<any>();
  const shuffle = async () => {
    let rand = Math.round(Math.random() * 10000000000);
    console.log(rand);
    let startColor = rand.toString(16).slice(-6);
    console.log(startColor);
    let endColor = rand.toString(16).slice(-6);
    while (colorDistance(startColor, endColor) < 200) {
      rand = Math.round(Math.random() * 10000000000);
      endColor = rand.toString(16).slice(-6);
    }
    console.log(endColor);
    let mixedColor = colorMix(startColor, endColor);
    let textShadow = {
      x: rand % 8,
      y: (rand / 8) % 8,
      blur: (rand / 64) % 8,
    };
    console.log(fontOptions[rand % 12]);
    let fontFamily = fontOptions[rand % 12].fontFamily;
    let fontWeight = fontOptions[rand % 12].fontWeight;
    let strokeSize = (rand % 16) + 5;
    fontWeight == 700 ? 4 : fontWeight == 500 ? 3 : fontWeight == 400 ? 2 : 1;
    console.log(`rand:${rand}, radn%3==${rand % 3}`);
    let strokeColor =
      rand % 3 == 0 ? "transparent" : rand % 3 == 1 ? "white" : "black";
    if (strokeColor == "transparent") strokeSize = 0;
    let fontSize = (rand % 50) + 50;
    let tmpTitleStyle = {
      height: fontSize,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontSize: fontSize,
      backgroundImage: `conic-gradient(
        #${mixedColor} 90deg,
        #${startColor} 90deg 180deg,
        #${endColor} 180deg 270deg,
        #${mixedColor} 270deg
      )`,
    };
    let tmpTitleBackStyle = {
      ...tmpTitleStyle,
      WebkitTextStroke: `${strokeSize}px ${strokeColor}`,
    };
    console.log(tmpTitleStyle);
    setTitleStyle(tmpTitleStyle);
    setTitleBackStyle(tmpTitleBackStyle);
  };
  useEffect(() => {
    console.log("effect");
    shuffle();
  }, []);
  return (
    <div id={id} className={cl}>
      <div>
        <div className="titleBack" style={titleBackStyle}>
          {title}
        </div>
        <div className="title" style={titleStyle}>
          {title}
        </div>
      </div>
      <button onClick={() => shuffle()} />
    </div>
  );
}
