import {
  __toESM,
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-EETRBLDB.js";

// app/routes/_index.jsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Index() {
  const [count, setCount] = (0, import_react.useState)(0);
  const onClick = () => {
    setCount(count + 1);
  };
  const Button = () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick, children: "Click me" }, void 0, false, {
    fileName: "app/routes/_index.jsx",
    lineNumber: 14,
    columnNumber: 24
  }, this);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Index" }, void 0, false, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
      "Count: ",
      count
    ] }, void 0, true, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {}, void 0, false, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.jsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-JBDX4W5R.js.map
