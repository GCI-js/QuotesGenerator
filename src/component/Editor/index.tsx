import idiotproof from "../../service/idiotproof";
import Context from "../Context";
import Title from "../Title";

import styles from "./index.module.scss";

export default function Editor(properties: Properties) {
  const id = [`_${idiotproof.trace(Editor)}`, properties.id].join();
  const cl = [styles.index, properties.className].join(" ");
  return (
    <div id={id} className={cl}>
      <div>editor frame</div>
      <Context
        context={
          "벚꽃이 지는 것처럼 모든 것이 시들어질 수 있으나, 다시 꽃이 피듯 인생에서도 다시 일어날 수 있다는 것을 명심하세요. 힘든 시기에도 희망을 잃지 말고, 행복을 향해 나아가요."
        }
      />
      <Title title="벚꽃" />
    </div>
  );
}
