import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/base.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const app = createApp(App);
const pinia = createPinia();
library.add(fas, far, fab);

pinia.use(piniaPluginPersistedstate);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
