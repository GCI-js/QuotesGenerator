import idiotproof from "../../service/idiotproof";
import { useState } from "react";
import InfoModal from "../InfoModal";
import styles from "./index.module.scss";
import info_img from "./info_img.svg";
import download_img from "./download_img.svg";
import share_img from "./share_img.svg";

import DownloadModal from "../DownloadModal";

export default function BottomInfo(properties: Properties) {
  const id = [`_${idiotproof.trace(BottomInfo)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [downloadModalOpen, setdownloadModalOpen] = useState(false);

  // 모달창 노출
  const showInfoModal = () => {
    console.log("clicked showInfoModal");
    setinfoModalOpen(true);
  };
  const showdownloadModal = () => {
    console.log("clicked showdownloadModal");
    setdownloadModalOpen(true);
  };

  async function shareClicked() {
    console.log("shareClicked....");
    //navigator.share가 지원되는 경우
    let data = {
      title: "한줄글귀정원",
      // text: "당신의 마음을 따뜻하게 해주는 한마디",
      url: "https://xn--hh0bte657eefbc8ayz7b.com",
    };
    // console.log("navigator....", navigator.canShare(data));

    if (navigator.share) {
      await navigator.share(data);
    } else {
      alert("해당 브라우저는 공유하기를 지원하지 않습니다.");
    }
  }

  return (
    <div id={id} className={cl}>
      <div className="InfoSave">
        <img src={info_img} onClick={() => showInfoModal()}></img>
        <img src={share_img} onClick={() => shareClicked()}></img>
        <img src={download_img} onClick={() => showdownloadModal()}></img>
      </div>
      {infoModalOpen && (
        <div className="ModalBackground">
          <InfoModal setinfoModalOpen={setinfoModalOpen} />
        </div>
      )}
      {downloadModalOpen && (
        <div className="ModalBackground">
          <DownloadModal setdownloadModalOpen={setdownloadModalOpen} />
        </div>
      )}
    </div>
  );
}
