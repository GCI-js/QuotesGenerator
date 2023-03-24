import idiotproof from "../../service/idiotproof";

import styles from "./index.module.scss";


export default function TemporalBoard(properties: Properties) {

    const id = [`_${idiotproof.trace(TemporalBoard)}`, properties.id].join();
    const cl = [styles.index, properties.className].join(" ");

    return <div id={id} className={cl}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
    </div>
}
