<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const loginForm = ref({
  userId: "",
  userPwd: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    const currentRoute = router.currentRoute.value;
    currentRoute.meta.showNavbar = true;
    currentRoute.name = "main";
    router.replace(currentRoute);
  } catch (error) {
    console.error("에러:", error);
    alert(" 실패");
  }
};
</script>

<template>
  <div class="absolute pt-24 pb-24 pl-36 pr-36 bg-white shadow-md">
    <div class="container grid place-items-center">
      <img
        src="/src/assets/logo-text.png"
        alt=""
        class="block relative w-30 justify-center"
      />
      <div class="grid gap-x-6 gap-y-8">
        <form @submit.prevent="login">
          <div class="mt-10 grid gap-x-6 gap-y-8">
            <div class="w-72">
              <div class="flex justify-between">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >아이디</label
                >
                <div class="text-right">
                  <input
                    type="checkbox"
                    id="saveid"
                    class="text-main-color"
                  /><label class="text-main-color ml-2 text-sm" for="saveid">
                    아이디 저장</label
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model.trim="loginForm.userId"
                  required
                  class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="w-72">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >비밀번호</label
              >
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  v-model.trim="loginForm.userPwd"
                  required
                  @keyup.enter="login"
                  class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="mt-14 flex items-center justify-center gap-x-6">
            <input
              type="submit"
              class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
              value="로그인"
            />
          </div>
          <div class="mt-2 flex items-center justify-center gap-x-6">
            <router-link
              :to="{ name: 'signup' }"
              class="text-gray-500 text-sm hover:text-main-color hover:no-underline"
              >회원가입</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
