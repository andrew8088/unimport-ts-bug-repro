const r = () => {
};
function s() {
  let e = r, o = r;
  return { promise: new Promise((t, n) => {
    e = t, o = n;
  }), resolve: e, reject: o };
}
function l() {
  const e = s();
  return setTimeout(() => {
    e.resolve("Hello, World!");
  }, 1e3), e.promise;
}
export {
  l as default
};
