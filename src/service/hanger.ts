const POSES: {[key: string]: StickerInfo} = {};
let COUNT = 0;

namespace hanger {
    export function path(name: string) {
        return require(`../img/sticker/${name}.png`).default;
    }
    export function poses() {
        return Object.entries(POSES);
    }
    export function update(id: string, info: StickerInfo) {
        POSES[id] = info;
    }
    export function create(name: string) {
        POSES[COUNT++] = {x: 100, y: 100, w: 100, h: 100, d: 0, n: "smile"};
    }
    export function remove(id: string) {
        delete POSES[id];
    }
}

export default hanger;
