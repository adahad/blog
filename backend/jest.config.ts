// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest/presets/default-esm",
//   testEnvironment: "node",
// };

import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: "ts-jest/presets/default-esm",
};

export default jestConfig;
