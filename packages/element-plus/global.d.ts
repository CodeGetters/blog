export {};

// Helper for Volar
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VlibBackTop: (typeof import("@blog/element-plus"))["Test"];
  }
}
