import path from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import { compRoot, outputEsm, outputCjs } from "../utils/path";
import { target, generateExternal, generatePaths } from "../utils/rollup";

export const buildModules = async () => {
  const input = [path.resolve(compRoot, "index.ts")];

  const bundle = await rollup({
    input,
    plugins: [
      vue(),
      nodeResolve(),
      esbuild({
        target,
        sourceMap: true,
      }),
    ],
    treeshake: false,
    external: await generateExternal({ full: true }),
  });
  await Promise.all([
    bundle.write({
      format: "esm",
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      entryFileNames: "[name].mjs",
    }),
    bundle.write({
      format: "cjs",
      dir: outputCjs,
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      entryFileNames: "[name].js",
      paths: generatePaths(),
    }),
  ]);
};
