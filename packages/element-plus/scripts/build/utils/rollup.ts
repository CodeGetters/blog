import { compPackage } from "./path";

export const target = "esnext";

export const getCompPackage = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version, dependencies, peerDependencies } = require(compPackage);
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};

/**
 * 提取外部依赖
 * 根据 package.json 中的 dependencies 和 peerDependencies
 * 来判断是否是外部依赖
 * @param options
 */
export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getCompPackage();

  const packages: string[] = peerDependencies;

  if (options.full) {
    packages.push(...dependencies);
  }

  return (id: string) => {
    return packages.some(
      (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`)),
    );
  };
};

export const generatePaths = () => {
  const paths = [
    ["lodash-es", "lodash"],
    ["vant/es", "vant/lib"],
  ];

  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath)) {
        return id.replace(oldPath, newPath);
      }
    }

    return "";
  };
};
