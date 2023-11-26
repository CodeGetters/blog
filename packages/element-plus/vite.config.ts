import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import viteCompression from "vite-plugin-compression";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default ({ mode }) => {
  console.log(mode);

  return defineConfig({
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "lib",
      rollupOptions: {
        external: ["element-plus", "vue"],
        output: {
          globals: {
            // 在 UMD 构建模式下为这些外部的依赖提供一个全局变量
            vue: "Vue",
          },
        },
      },
      lib: {
        name: "selfComponents",
        entry: resolve(__dirname, "./src/components/index.ts"),
        fileName: (format: string) => `element.${format}.js`,
        formats: ["es", "cjs", "umd", "iife"],
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // viteCompression(),
    ],
  });
};
