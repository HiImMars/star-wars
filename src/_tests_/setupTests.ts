// import "@testing-library/jest-dom";

// class ResizeObserver {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

// global.ResizeObserver = ResizeObserver;

// jest.mock("resize-observer-polyfill", () => ({
//   __esModule: true,
//   ResizeObserver: class {
//     callback: (entries: ResizeObserverEntry[]) => void;
//     entries: any[];
//     constructor(callback: (entries: ResizeObserverEntry[]) => void) {
//       this.callback = callback;
//       this.entries = []; // Initialize an empty array to store entries
//     }

//     observe(target: Element) {
//       // Simulate an initial resize for the observed element
//       this.entries.push({
//         target,
//         contentRect: {
//           width: (target as HTMLElement).offsetWidth,
//           height: (target as HTMLElement).offsetHeight,
//           top: (target as HTMLElement).offsetTop,
//           left: (target as HTMLElement).offsetLeft,
//           x: (target as HTMLElement).offsetLeft,
//           y: (target as HTMLElement).offsetTop,
//           bottom:
//             (target as HTMLElement).offsetTop +
//             (target as HTMLElement).offsetHeight,
//           right:
//             (target as HTMLElement).offsetLeft +
//             (target as HTMLElement).offsetWidth,
//         },
//         contentBoxSize: {
//           width: (target as HTMLElement).offsetWidth,
//           height: (target as HTMLElement).offsetHeight,
//         },
//         borderBoxSize: {
//           width: (target as HTMLElement).offsetWidth,
//           height: (target as HTMLElement).offsetHeight,
//         },
//         devicePixelRatio: window.devicePixelRatio,
//       });

//       // Trigger the callback with the initial resize entry
//       this.callback(this.entries);
//     }

//     unobserve(target: Element) {
//       // Remove the target from the entries array
//       this.entries = this.entries.filter((entry) => entry.target !== target);
//     }

//     disconnect() {} // Not implemented for this mock
//   },
// }));
