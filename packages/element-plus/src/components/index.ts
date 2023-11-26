import "virtual:uno.css";

// export * from "./Test";
import AffTest from "./Test";

export { AffTest };

const components = [AffTest];
const install = (App: any) => {
  components.forEach((item) => {
    App.component(item.__name, item);
  });
};

export default {
  install,
};
