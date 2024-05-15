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

import { useMemberStore } from "@/stores/member";

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

// router.beforeEach(async (to, from) => {
//   if (to.name === "login" || to.name === "signup") {
//     return true;
//   }

//   const memberStore = useMemberStore();
//   const { userInfo, isValidToken } = storeToRefs(memberStore);
//   const { getUserInfo } = memberStore;

//   let token = sessionStorage.getItem("accessToken");

//   if (userInfo.value != null && token) {
//     await getUserInfo(token);
//   }

//   if (!isValidToken.value || userInfo.value === null) {
//     return { name: "login" };
//   } else {
//     return { name: "main" };
//   }
// });

export default router;
