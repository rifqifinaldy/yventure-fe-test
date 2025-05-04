import "@testing-library/jest-dom";

globalThis.structuredClone = (obj) => {
  if (obj === undefined) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
};

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
