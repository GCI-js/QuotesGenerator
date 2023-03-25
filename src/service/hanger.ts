import shepherd from "./shepherd";

const POSES: {[key: string]: StickerInfo} = {};
let COUNT = 0;
let RECENT_ID = -1;

namespace hanger {
    export function path(i: string) {
        return require(`../img/sticker/${i}.png`).default;
    }
    export function poses() {
        return Object.entries(POSES);
    }
    export function update(id: string, info: StickerInfo) {
        RECENT_ID = -1;
        POSES[id] = info;
    }
    export function create() {
        const i = Math.floor(Math.random() * 23) + ""
        RECENT_ID = COUNT;
        POSES[COUNT++] = {x: 25 + 100, y: 125 + 100, w: 0, h: 0, n: i};
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
