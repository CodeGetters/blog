import { series, parallel } from "gulp";
import { buildFull } from "./task/build-full";
import { buildModules } from "./task/build-modules";
import { clean } from "./task/clean";
import { generateTypes } from "./task/generate-types";
import { buildStyle } from "./task/build-style";
import { generateHelper } from "./task/generate-helper";

export default series(
  clean,
  parallel(buildModules, buildFull, buildStyle, generateTypes, generateHelper),
);
