import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.scss";

createRoot(document.getElementById("app")).render(<App />);

document.addEventListener('touchmove', (event: TouchEvent) => {
    event.preventDefault();
}, { passive: false });
