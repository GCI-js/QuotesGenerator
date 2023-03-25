import idiotproof from "../../service/idiotproof";
import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

interface Props extends Properties {
  setdownloadModalOpen: Function;
}

export default function DownloadModal(properties: Props) {
  const id = [`_${idiotproof.trace(DownloadModal)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const closeModal = () => {
    console.log("clicked closeModal.....");
    properties.setdownloadModalOpen(false);
    html2canvas(document.getElementById("_2,")).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), "image_togonapshin.png");
    });
  };
  function onSaveAs(uri: string, filename: string) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: { target: any }) => {
      console.log("modalRef....");
      console.log(modalRef);

      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        console.log("clicked......");

        properties.setdownloadModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler); // 모바일 대응
    };
  }, [modalRef]);

  return (
    <div id={id} className={cl} ref={modalRef}>
      <div className="downloadModalTitle">다운로드</div>
      <div className="downloadModalBody">
        <div>이미지를 다운로드하시려면 스크린샷을 찍으세요.</div>
        <br />
        <div className="bodyBold">iOS</div>
        1. 측면 버튼/홈버튼과 음량 높이기 버튼을 동시에 누릅니다.
        <br />
        2. 두 버튼을 빠르게 놓습니다.
        <br />
        3. 스크린샷을 찍으면 화면의 왼쪽 하단 모서리에 축소판 이미지가
        일시적으로 나타납니다. 축소판 이미지를 탭하여 열거나 왼쪽으로 쓸어넘겨
        닫습니다.
        <br />
        <br />
        <div className="bodyBold">안드로이드</div>
        1. 캡처하려는 화면을 엽니다.
        <br />
        2. 휴대전화에 따라 다음 방법 중 하나를 사용하면 됩니다.
        <br />
        <div className="bodyIndent">
          · 전원 및 볼륨 다운 버튼을 동시에 누릅니다.
          <br />· 스크린샷이 찍히지 않으면 전원 버튼을 몇 초 동안 길게 누른 다음
          스크린샷을 탭합니다.
        </div>
        <br />
        3. 왼쪽 하단에 스크린샷 미리보기가 표시됩니다. 일부 휴대전화에서는 화면
        상단에 스크린샷 캡처 가 표시되기도 합니다.
      </div>

      <button className="modalCheck" onClick={() => closeModal()}>
        확인
      </button>
    </div>
  );
}
