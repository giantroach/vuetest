import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App).mount("#app");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)["vue"] = app;
