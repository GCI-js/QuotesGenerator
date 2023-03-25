import idiotproof from "../../service/idiotproof";
import { useState } from "react";
import InfoModal from "../InfoModal";
import styles from "./index.module.scss";
import info_img from "./info_img.svg";
import download_img from "./download_img.svg";
import DownloadModal from "../DownloadModal";

export default function DesktopBottomInfo(properties: Properties) {
  const id = [`_${idiotproof.trace(DesktopBottomInfo)}`, properties.id].join();
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

  return (
    <div id={id} className={cl}>
      <div className="InfoSave">
        <img src={info_img} onClick={() => showInfoModal()}></img>
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
