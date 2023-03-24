import { useEffect, useRef } from "react";
import hanger from "../../service/hanger";

import idiotproof from "../../service/idiotproof"
import shepherd from "../../service/shepherd";

import styles from "./index.module.scss"


interface Properties_ extends Properties {
    pose_id: string;
    info: StickerInfo;
    activate: Function;
    deactivate: Function;
}

export default function Sticker(properties: Properties_) {
    const id = [`_${idiotproof.trace(Sticker)}`, properties.id].join();
    const cl = [styles.index, properties.className].join(" ");
    const self = useRef<HTMLDivElement>(null);
    const info = properties.info;
    const pose_id = properties.pose_id;
    const half_w = info.w / 2;
    const half_h = info.h / 2;
    const name = info.n;
    useEffect(() => {
        const style = self.current.style;
        style.width = info.w + "px";
        style.height = info.h + "px";
        style.left = info.x + "px";
        style.top = info.y + "px";
        style.rotate = info.d + "deg";
        if (hanger.check(pose_id)) activate();
    })
    function activate() {
        const elem = self.current
        const style = elem.style;
        const cls = elem.classList;
        if (cls.contains("hover")) return;
        cls.add("hover");
        elem.ontouchstart = () => {
            cls.add("alive");
            properties.activate();
        }
        elem.ontouchmove = e => {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            style.left = x - half_w + "px";
            style.top = y - half_h + "px";
        }
        document.ontouchend = () => {
            if (cls.contains("alive")) cls.remove("alive");
            else {
                elem.ontouchstart = elem.ontouchmove = null;
                cls.remove("hover")
            }
            const style = getComputedStyle(elem);
            const x = parseInt(style.left)
            const y = parseInt(style.top)
            const w = parseInt(style.width)
            const h = parseInt(style.height)
            const d = parseInt(style.rotate)
            properties.deactivate(pose_id,
                                  {x: x, y: y, w: w, h: h, d: d, n: name});
            shepherd.chase("editor");
        }
    }

    return <div id={id} className={cl} ref={self} onClick={activate}>
        <div className="handle"></div>
        <img className="content" src={hanger.path(name)} alt="" />
    </div>
}
