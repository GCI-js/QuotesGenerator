import { useRef } from "react";
import Title from "../Title";

import idiotproof from "../../service/idiotproof"
import shepherd from "../../service/shepherd";

import styles from "./index.module.scss"


export default function TitleSticker(properties: Properties) {
    const id = [`_${idiotproof.trace(TitleSticker)}`, properties.id].join();
    const cl = [styles.index, properties.className].join(" ");
    const self = useRef<HTMLDivElement>(null);

    function detachedTouchStart(event: TouchEvent) {
        const cl = styles.index
        const tgt = (event.target as HTMLDivElement).closest(`.${cl}`);
        const elem = document.getElementsByClassName(cl)[0];
        const cls = elem.classList
        cls.remove("alive");
        if (tgt == elem) cls.add("alive");
        else {
            document.ontouchstart =
                document.ontouchmove = document.ontouchend = null;
        }
    }

    function activate() {
        const elem = self.current
        const cls = elem.classList;
        if (cls.contains("alive")) return;
        cls.add("alive");
        const style = getComputedStyle(elem);
        const elem_style = elem.style;
        document.ontouchstart = e => {
            elem_style.width = style.width;
            detachedTouchStart(e)
        }
        document.ontouchmove = e => {
            const x = e.touches[0].clientX - 25;
            const y = e.touches[0].clientY - 150;
            elem_style.left = x - parseInt(style.width) / 2 + "px";
            elem_style.top = y - parseInt(style.height) / 2 + "px";
        }
    }

    return <div id={id} className={cl} ref={self} onTouchStart={activate}>
        <Title title="벚꽃"/>
    </div>
}
