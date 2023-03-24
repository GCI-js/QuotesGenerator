import shepherd from "./shepherd"

let PATH = require(
    `../img/tapestry/${Math.floor(Math.random() * 7)}.png`).default;

namespace tapestry {
    export function choose() {
        const i = Math.floor(Math.random() * 7);
        PATH = require(`../img/tapestry/${i}.png`).default;
        shepherd.chase("editor");
    }
    export function path() {
        return PATH
    }
}

export default tapestry;
