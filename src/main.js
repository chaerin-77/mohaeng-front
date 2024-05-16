import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/base.css";

import { useKakao } from "vue3-kakao-maps/@utils";

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

useKakao("f7bff4e8045801a595a9f8f93c55fa30");

router.isReady().then(() => {
  app.mount("#app");
});
