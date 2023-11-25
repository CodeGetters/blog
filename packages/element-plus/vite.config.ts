import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
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
      rollupOptions: {
        external: ["element-plus", "vue"],
        // output: {
        //   entryFileNames: "assets/js/[name].js",
        //   chunkFileNames: "assets/js/[name]-[hash].js",
        //   assetFileNames: "assets/[ext]/[name]-[hash]-.[ext]",
        //   manualChunks(id) {
        //     if (id.includes("node_modules")) {
        //       return id
        //         .toString()
        //         .split("node_modules/")[1]
        //         .split("/")[0]
        //         .toString();
        //     }
        //   },
        // },
      },
      lib: {
        name: "selfComponents",
        entry: resolve(__dirname, "./src/components/index.ts"),
        fileName: (format: string) => `self-component.${format}.js`,
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
      viteCompression(),
    ],
  });
};
