import shepherd from "./shepherd";

const POSES: {[key: string]: StickerInfo} = {};
let COUNT = 0;
let RECENT_ID = -1;

const names = [
    "2023",
    "꽃액자",
    "노란꽃",
    "리본",
    "보석하트",
    "부적",
    "연꽃",
    "연인",
    "장미",
    "클로버",
    "하트",
]

namespace hanger {
    export function path(name: string) {
        return require(`../img/sticker/${name}.png`).default;
    }
    export function poses() {
        return Object.entries(POSES);
    }
    export function update(id: string, info: StickerInfo) {
        RECENT_ID = -1;
        POSES[id] = info;
    }
    export function create(name: string) {

        name = names[Math.floor(Math.random() * names.length)];

        RECENT_ID = COUNT;
        POSES[COUNT++] = {x: 25 + 100, y: 125 + 100, w: 0, h: 0, n: name};
        shepherd.chase("editor");
        document.ontouchend = null;
    }
    export function remove(id: string) {
        RECENT_ID = -1;
        document.ontouchend = null;
        delete POSES[id];
    }
    export function check(id: string) {
        const rslt = RECENT_ID == parseInt(id)
        if (rslt) RECENT_ID = -1;
        return rslt;
    }
}

export default hanger;
