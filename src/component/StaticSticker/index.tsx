import { useRef } from "react";
import Title from "../Title";

import idiotproof from "../../service/idiotproof"

import styles from "./index.module.scss"
import Context from "../Context";


interface Properties_ extends Properties {
    type: "title" | "context";
    content: string;
}


export default function StaticSticker(properties: Properties_) {
    const id = [`_${idiotproof.trace(StaticSticker)}`, properties.id].join();
    const cl = [styles.index, properties.className].join(" ");
    const self = useRef<HTMLDivElement>(null);
    const content = properties.content;
    function activate() {
        const elem = self.current
        const cls = elem.classList;
        if (cls.contains("alive")) return;
        cls.add("alive");
        const style = getComputedStyle(elem);
        const elem_style = elem.style;
        document.ontouchmove = e => {
            const x = e.touches[0].clientX - 25;
            const y = e.touches[0].clientY - 150;
            elem_style.left = x - parseInt(style.width) / 2 + "px";
            elem_style.top = y - parseInt(style.height) / 2 + "px";
        }
        document.ontouchend = () => cls.remove("alive");
    }
    const elem = properties.type == "title" ?
        <Title title={content}/> : <Context context={content}/>

    return <div id={id} className={cl} ref={self} onTouchStart={activate}>
        {elem}
    </div>
}
