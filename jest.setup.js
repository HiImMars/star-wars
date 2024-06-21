// require("@testing-library/jest-dom");
// require("resize-observer-polyfill");

import "@testing-library/jest-dom";

import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;
