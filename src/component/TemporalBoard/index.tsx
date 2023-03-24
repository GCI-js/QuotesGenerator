import idiotproof from "../../service/idiotproof";
import hanger from "../../service/hanger";

import styles from "./index.module.scss";
import shepherd from "../../service/shepherd";


export default function TemporalBoard(properties: Properties) {

    const id = [`_${idiotproof.trace(TemporalBoard)}`, properties.id].join();
    const cl = [styles.index, properties.className].join(" ");

    function create() {
        hanger.create("asdf");
        shepherd.chase("editor");
    }

    return <div id={id} className={cl}>
        <div onClick={create}>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
    </div>
}
