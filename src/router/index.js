import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import UserView from "@/views/UserView.vue";
import Login from "@/components/intro/Login.vue";
import Signup from "@/components/intro/Signup.vue";
import Mypage from "@/components/user/Mypage.vue";
import DiaryView from "@/views/DiaryView.vue";
import DiaryHome from "@/components/diary/DiaryHome.vue";
import DiaryPlan from "../components/diary/DiaryPlan.vue";
import DiaryMemory from "../components/diary/DiaryMemory.vue";

import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
      meta: {
        showNavbar: true,
      },
      children: [
        {
          path: "mypage",
          name: "mypage",
          component: Mypage,
        },
      ],
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
    {
      path: "/diary",
      name: "diary",
      component: DiaryView,
      meta: {
        showNavbar: true,
      },
      children: [
        {
          path: "home",
          name: "diaryHome",
          component: DiaryHome,
        },
        {
          path: "plan",
          name: "diaryPlan",
          component: DiaryPlan,
        },
        {
          path: "memory",
          name: "diaryMemory",
          component: DiaryMemory,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.name === "login" || to.name === "signup") {
    next();
    return;
  }
  const authStore = useAuthStore();

  if (!authStore.user) {
    alert("로그인 해주세요.");
    next({ name: "login" });
    return;
  }
  next();
});

export default router;
