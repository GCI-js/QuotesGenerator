import idiotproof from "../../service/idiotproof";
import styles from "./index.module.scss";
import { useEffect, useRef } from "react";

interface Props extends Properties {
  setinfoModalOpen: Function;
}

export default function InfoModal(properties: Props) {
  const id = [`_${idiotproof.trace(InfoModal)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");

  const closeModal = () => {
    console.log("clicked closeModal.....");
    properties.setinfoModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: { target: any }) => {
      console.log("modalRef....");
      console.log(modalRef);

      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        console.log("clicked......");

        properties.setinfoModalOpen(false);
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
      <div className="infoModalTitle">소개글</div>
      <div className="infoModalBody">
        저희는 GCI.js 입니다. 일상생활에서 여러분의 지혜를 널리 퍼트리고자
        한줄글귀정원을 만들게 되었습니다. 많이 아껴주시고, 성원해주시고,
        후원해주시고, 격려해주시고, 보태주시고, 밀어주시고, 염려해주시고,
        근심해주시고, 걱정해주시고, 사랑해주시고, 은혜를 내려 주세요.
      </div>
      <div className="infoModalSupport">
        <div>후원계좌 : 카카오뱅크 박진호 7979-77-80219</div>
      </div>
      <button className="modalCheck" onClick={() => closeModal()}>
        확인
      </button>
    </div>
  );
}
