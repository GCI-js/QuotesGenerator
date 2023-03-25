import Context from "../Context";
import Title from "../Title";
import { useRef } from "react";
import hanger from "../../service/hanger";
import idiotproof from "../../service/idiotproof";
import shepherd from "../../service/shepherd";
import tapestry from "../../service/tapestry";

import Sticker from "../Sticker";

import styles from "./index.module.scss";
import Watermark from "../Watermark";

interface Props extends Properties {
  quote: any;
}
export default function Editor(properties: Props) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  const self = useRef<HTMLDivElement>(null);
  const deleter_ref = useRef<HTMLDivElement>(null);
  const quote = properties.quote;
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

  return (
    <div id={id} className={cl} ref={self}>
      <img className="tapestry" src={tapestry.path()} alt="" />
      {hanger.poses().map((v) => (
        <Sticker
          key={v[0]}
          pose_id={v[0]}
          info={v[1]}
          activate={activate}
          deactivate={deactivate}
        />
      ))}
      <div className="deleter" ref={deleter_ref}>
        삭제
      </div>
    </div>
  );
}
