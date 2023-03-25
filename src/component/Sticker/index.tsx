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
    const handle_ref = useRef<HTMLDivElement>(null);
    const info = properties.info;
    const pose_id = properties.pose_id;
    const name = info.n;

    useEffect(() => {
        const elem = self.current;
        const elem_style = elem.style;
        const style = getComputedStyle(elem);
        elem_style.left = info.x + "px";
        elem_style.top = info.y + "px";
        if (hanger.check(pose_id)) {
            elem_style.opacity = "0";
            activate();
        }
        setTimeout(() => {
            elem_style.width = style.width;
            elem_style.height = style.height;
            elem_style.opacity = "1"
        }, 100);
    })

    function detachedTouchStart(event: TouchEvent) {
        let is_alive = false
        const cl = styles.index
        const tgt = (event.target as HTMLDivElement).closest(`.${cl}`);
        const elems = document.getElementsByClassName(
            cl) as HTMLCollectionOf<HTMLDivElement>;
        Array.from(elems).forEach(v => {
            const cls = v.classList
            cls.remove("alive");
            if (tgt != v) return
            is_alive = true;
            cls.add("alive");
            properties.activate();
        })
        if (is_alive) return;
        document.ontouchstart =
            document.ontouchmove = document.ontouchend = null;
    }

    function activate() {
        const handle = handle_ref.current;
        const elem = self.current
        const cls = elem.classList;
        if (cls.contains("alive")) return;
        cls.add("alive");
        const elem_style = elem.style;
        const style = getComputedStyle(elem);
        document.ontouchstart = e => {
            if (e.target == handle) return;
            detachedTouchStart(e)
        }
        document.ontouchmove = e => {
            if (e.target == handle) return;
            const x = e.touches[0].clientX - 25;
            const y = e.touches[0].clientY - 150;
            elem_style.left = x - parseInt(style.width) / 2 + "px";
            elem_style.top = y - parseInt(style.height) / 2 + "px";
        }
        document.ontouchend = () => {
            const x = parseInt(style.left)
            const y = parseInt(style.top)
            const w = parseInt(style.width)
            const h = parseInt(style.height)
            properties.deactivate(
                pose_id, {x: x, y: y, w: w, h: h, n: name});
            shepherd.chase("editor");
        }
    }

    function manipulate(event: React.TouchEvent) {
        const touch = event.touches[0];
        const base_x = touch.clientX;
        const base_y = touch.clientY;
        const elem = self.current;
        const style = getComputedStyle(elem)
        const elem_style = elem.style;
        const base_w = parseInt(style.width);
        const base_h = parseInt(style.height);
        document.ontouchmove = e => {
            const touch = e.touches[0];
            elem_style.width = base_w + touch.clientX - base_x + 'px';
            elem_style.height = base_h + touch.clientY - base_y + 'px';
        }
        document.ontouchend = () => {
            elem.classList.remove("alive");
            activate();
        }
    }

    return <div id={id} className={cl} ref={self} onTouchStart={activate}>
        <div className="handle"
             onTouchStart={manipulate} ref={handle_ref}></div>
        <img className="content" src={hanger.path(name)} alt="" />
    </div>
}
