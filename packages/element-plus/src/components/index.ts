import "virtual:uno.css";
import type { App } from "vue";
import AffTest from "./Test";

export * from "./Test";

export { AffTest };

const components = [AffTest];

export function install(app: App) {
  components.forEach((item: any) => {
    if (item.install!) {
      app.use(item);
    } else if (item.__name) {
      app.component(item.__name as string, item);
    }
  });
}

export default {
  install,
  components,
};
