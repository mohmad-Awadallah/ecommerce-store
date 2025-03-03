// src/setupTests.js
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (/punycode|React Router Future Flag/.test(args[0])) return;
    originalError(...args);
  };
  
  console.warn = (...args) => {
    if (/punycode|deprecated/.test(args[0])) return;
    originalWarn(...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});