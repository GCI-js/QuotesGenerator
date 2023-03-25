import idiotproof from "../../service/idiotproof";
import tapestry from "../../service/tapestry";
import hanger from "../../service/hanger";
import { useState } from "react";
import InfoModal from "../InfoModal";
import styles from "./index.module.scss";
import text_img from "./text_img.svg";
import font_img from "./font_img.svg";
import background_img from "./background_img.svg";
import sticker_img from "./sticker_img.svg";
import info_img from "./info_img.svg";
import download_img from "./download_img.svg";
import html2canvas from "html2canvas";
interface Props extends Properties {
  randomText: Function;
}
export default function TemporalBoard(properties: Props) {
  const id = [`_${idiotproof.trace(TemporalBoard)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  async function saveClicked() {
    console.log("saveclicked....");
    //navigator.share가 지원되는 경우
    if (navigator.canShare) {
      await navigator.share({
        title: "test",
        //text: '',
        url: "www.naver.com",
      });
    } else {
      html2canvas(document.getElementById("testCapture")).then((canvas) => {
        onSaveAs(canvas.toDataURL("image/png"), "image_togonapshin.png");
      });
    }
  }
  function onSaveAs(uri: string, filename: string) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }

  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    console.log("clicked showModal");
    setModalOpen(true);
  };

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
      <div className="InfoSave">
        <img src={info_img} onClick={() => showModal()}></img>
        <img src={download_img} onClick={() => saveClicked()}></img>
      </div>
      {modalOpen && <InfoModal setModalOpen={setModalOpen} />}
    </div>
  );
}
