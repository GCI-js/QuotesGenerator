import idiotproof from "../../service/idiotproof";

import styles from "./index.module.scss";


export default function Editor(properties: Properties) {
    const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
    const cl = [styles.index, properties.className].join(" ");
    return <div id={id} className={cl}>
        <div>editor frame</div>
    </div>
}
