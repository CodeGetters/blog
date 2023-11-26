// import { withInstall } from "../../utils";

import AffTest from "./src/AffTest.vue";

// export const AFTest = withInstall(AffTest);
AffTest.install = (App: any) => {
  App.component(AffTest.__name, AffTest);
};
export default AffTest;

// export default AFTest;

export * from "./";
