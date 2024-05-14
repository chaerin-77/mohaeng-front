import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import UserView from "@/views/UserView.vue";
import Login from "@/components/intro/Login.vue";
import Signup from "@/components/intro/Signup.vue";

import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      meta: {
        showNavbar: false,
      },
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
        },
        {
          path: "signup",
          name: "signup",
          component: Signup,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.name === "login" || to.name === "signup") {
    return true;
  }

  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }

  if (!isValidToken.value || userInfo.value === null) {
    return { name: "login" };
  } else {
    return { name: "main" };
  }
});

export default router;
