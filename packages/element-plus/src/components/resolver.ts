import type {
  ComponentResolver,
  SideEffectsInfo,
} from "unplugin-vue-components/types";
import { kebabCase } from "unplugin-vue-components";

// 判断是不是服务端渲染
const isSSR = Boolean(
  process.env.SSR ||
    process.env.SSG ||
    process.env.VITE_SSR ||
    process.env.VITE_SSG,
);

// 服务端渲染使用 cjs 模块，反之使用 esm 模块
const moduleType = isSSR ? "lib" : "es";

// 解析器的参数配置
export interface VlibResolverOptions {
  // 执行加载 css 还是 scss，默认加载 css
  importStyle?: boolean | "css" | "scss";
}

// 获取到副作用
function getSideEffects(
  dirName: string,
  options: VlibResolverOptions,
): SideEffectsInfo | undefined {
  // 是否加载
  const { importStyle = true } = options;
  if (!importStyle || isSSR) return;

  // 获取到副作用的路径
  if (importStyle === "scss") {
    return `@blog/element-plus/${moduleType}/${dirName}/style/scss`;
  } else {
    return `@blog/element-plus/${moduleType}/${dirName}/style/index`;
  }
}

export function VlibResolver(
  options: VlibResolverOptions = {},
): ComponentResolver {
  return {
    type: "component", // 组件类型
    resolve: (name: string) => {
      // 判断解析的组件名称是不是当前组件库的
      if (name.startsWith("Vlib")) {
        // 获取到组件名称
        const partialName = name.slice(4);
        return {
          // 组件名称
          name: partialName,
          // 从哪个路径导入，es/lib
          from: `@blog/element-plus/${moduleType}`,
          // 根据组件名称获取到对应的 css 导入路径。BackTop => es/back-top/style/index
          sideEffects: getSideEffects(kebabCase(partialName), options),
        };
      }
    },
  };
}
