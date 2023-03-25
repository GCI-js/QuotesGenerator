import shepherd from "./shepherd"

let PATH = require(
    `../img/fromSD/${Math.floor(Math.random() * 542)}.jpg`).default;

namespace tapestry {
    export function choose() {
        const i = Math.floor(Math.random() * 542);
        PATH = require(`../img/fromSD/${i}.jpg`).default;
        shepherd.chase("editor");
    }
    export function path() {
        return PATH
    }
}

export default tapestry;
