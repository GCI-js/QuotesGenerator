import idiotproof from "../../service/idiotproof";
import tapestry from "../../service/tapestry";
import hanger from "../../service/hanger";
import { useState } from "react";
import styles from "./index.module.scss";
import text_img from "./text_img.svg";
import font_img from "./font_img.svg";
import background_img from "./background_img.svg";
import sticker_img from "./sticker_img.svg";
interface Props extends Properties {
  randomText: Function;
}
export default function TemporalBoard(properties: Props) {
  const id = [`_${idiotproof.trace(TemporalBoard)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  return (
    <div id={id} className={cl}>
      <div className="BottomBar">
        <div className="BottomStruct">
          <div
            id="testCapture"
            className="TextButton"
            onClick={() => properties.randomText()}
          >
            <img src={text_img} className="ButtonImg" />
          </div>
          <div className="ButtonText">문구</div>
        </div>
        <div className="BottomStruct">
          <div className="FontButton">
            <img src={font_img} className="ButtonImg" />
          </div>
          <div className="ButtonText">폰트</div>
        </div>
        <div className="BottomStruct">
          <div className="BackgroundButton" onClick={() => tapestry.choose()}>
            <img src={background_img} className="ButtonImg" />
          </div>
          <div className="ButtonText">배경</div>
        </div>
        <div className="BottomStruct">
          <div className="StickerButton" onClick={() => hanger.create("")}>
            <img src={sticker_img} className="ButtonImg" />
          </div>
          <div className="ButtonText">스티커</div>
        </div>
      </div>
    </div>
  );
}
