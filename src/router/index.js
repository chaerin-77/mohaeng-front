import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import UserView from "@/views/UserView.vue";
import Login from "@/components/intro/Login.vue";
import Signup from "@/components/intro/Signup.vue";
import MypageView from "@/views/MypageView.vue";
import UpdateMyInfo from "@/components/user/UpdateMyInfo.vue";
import UpdatePassword from "@/components/user/UpdatePassword.vue";
import InviteView from "@/views/InviteView.vue";
import DiaryView from "@/views/DiaryView.vue";
import DiaryHome from "@/components/diary/Home/DiaryHome.vue";
import DiaryPlan from "../components/diary/Plan/DiaryPlan.vue";
import DiaryMemory from "../components/diary/Memory/DiaryMemory.vue";
import AddMemory from "@/components/diary/Memory/AddMemory.vue";

import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
import { useTodoStore } from "@/stores/todo";
import { useNoticeStore } from "@/stores/notice";
import { useChatStore } from "@/stores/chat";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
      props: true,
      meta: {
        showNavbar: true,
        requiresAuth: true,
      },
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MypageView,
      props: true,
      meta: {
        showNavbar: true,
        requiresAuth: true,
      },
      children: [
        {
          path: "myinfo",
          name: "myinfo",
          props: true,
          component: UpdateMyInfo,
        },
        {
          path: "password",
          name: "password",
          props: true,
          component: UpdatePassword,
        },
      ],
    },
    {
      path: "/user",
      component: UserView,
      props: true,
      meta: {
        showNavbar: false,
        requiresAuth: false,
      },
      children: [
        {
          path: "login",
          name: "login",
          props: true,
          component: Login,
        },
        {
          path: "signup",
          name: "signup",
          props: true,
          component: Signup,
        },
      ],
    },
    {
      path: "/invite",
      name: "invite",
      component: InviteView,
      props: true,
      meta: {
        showNavbar: true,
        requiresAuth: true,
      },
    },
    {
      path: "/diary",
      component: DiaryView,
      props: true,
      meta: {
        showNavbar: true,
        requiresAuth: true,
      },
      children: [
        {
          path: "home",
          name: "diaryHome",
          component: DiaryHome,
          props: true,
        },
        {
          path: "plan",
          name: "diaryPlan",
          component: DiaryPlan,
          props: true,
        },
        {
          path: "memory",
          name: "diaryMemory",
          component: DiaryMemory,
          props: true,
        },
        {
          path: "addmemory",
          name: "addMemory",
          component: AddMemory,
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authStore = useAuthStore();
  const groupStore = useGroupStore();
  const todoStore = useTodoStore();
  const noticeStore = useNoticeStore();
  const chatStore = useChatStore();

  if (requiresAuth && !authStore.user) {
    alert("로그인 해주세요.");
    next({ name: "login" });
    return;
  }

  if (to.name === "main") {
    await groupStore.getGroupList(); // 메인 페이지로 이동할 때 실행할 함수
  }

  if (to.name === "diaryHome") {
    // 다이어리 페이지로 이동할 때 실행할 함수
    await noticeStore.getNoticeList();
    await todoStore.getTodoList();
    await chatStore.getChatlist();
    // console.log("beforeEach");
  }

  next();
});

export default router;
