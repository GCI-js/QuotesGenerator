import shepherd from "./shepherd"

const i = Math.floor(Math.random() * 330)
let PATH = require(`../img/fromSD/${i}.jpg`).default;

namespace tapestry {
    export function choose() {
        const i = Math.floor(Math.random() * 330)
        PATH = require(`../img/fromSD/${i}.jpg`).default;
        shepherd.chase("editor");
    }
    export function path() {
        return PATH
    }
}

export default tapestry;
