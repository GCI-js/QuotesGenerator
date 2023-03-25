import { useEffect, useRef } from "react";
import hanger from "../../service/hanger";
import idiotproof from "../../service/idiotproof";
import shepherd from "../../service/shepherd";
import tapestry from "../../service/tapestry";

import Sticker from "../Sticker";
import Watermark from "../Watermark";

import styles from "./index.module.scss";
import StaticSticker from "../StaticSticker";

export default function Editor(properties: Properties) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const self = useRef<HTMLDivElement>(null);
  const deleter_ref = useRef<HTMLDivElement>(null);
  shepherd.adopt("editor", id);

  function activate() {
    const elem = self.current;
    const deleter = deleter_ref.current;
    elem.classList.add("touched");
    const limit = deleter.offsetTop;
    elem.ontouchmove = (e) => {
      const y = e.touches[0].clientY;
      if (y > limit) deleter.classList.add("hover");
      if (y <= limit) deleter.classList.remove("hover");
    };
    elem.ontouchend = () => {
      elem.ontouchmove = elem.ontouchend = null;
    };
  }
  function deactivate(pose_id: string, pose: StickerInfo) {
    const elem = self.current;
    const deleter = deleter_ref.current;
    elem.classList.remove("touched");
    if (deleter.classList.contains("hover")) {
      hanger.remove(pose_id);
      deleter.classList.remove("hover");
    } else hanger.update(pose_id, pose);
  }

  useEffect(() => {
    const elem = self.current;
    elem.style.background = `center / cover no-repeat url("${tapestry.path()}")`
  });
  return <div id={id} className={cl} ref={self}>
      <Watermark className="watermark"/>
      <StaticSticker className="title" type="title"
        content="벚꽃"/>
      <StaticSticker className="context" type="context"
        content="이젠 좀 길게 보고 움직여야 할 떄가 아닐까요 우리의 인생은 마라톤처럼 길고 긴 여행입니다"/>
      {hanger.poses().map((v) => <Sticker
          key={v[0]}
          pose_id={v[0]}
          info={v[1]}
          activate={activate}
          deactivate={deactivate}/>)}
      <div className="deleter" ref={deleter_ref}>
          <div>🗑</div>
          <span>쓰레기통</span>
      </div>
  </div>
}
