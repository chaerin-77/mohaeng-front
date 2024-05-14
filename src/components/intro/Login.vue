<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const memberStore = useMemberStore();

const { isLogin, isLoginError } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;

const loginUser = ref({
  userId: "",
  userPwd: "",
});

const login = async () => {
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  console.log(token);
  console.log("isLogin: " + isLogin.value);
  if (isLogin.value) {
    getUserInfo(token);
    router.replace("/");
  }
};
</script>

<template>
  <div class="login-box">
    <div class="container grid place-items-center mt-20">
      <img
        src="/src/assets/logo-text.png"
        alt=""
        class="block relative w-30 justify-center"
      />
      <div class="grid col-span-full gap-x-6 gap-y-8">
        <form>
          <div class="mb-3 justify-end">
            <input class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="saveid"> 아이디저장 </label>
          </div>
          <div class="mt-10 grid gap-x-6 gap-y-8">
            <div class="w-72">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >아이디</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="loginUser.userId"
                  class="block w-full rounded-md border-2 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  v-model="loginUser.userPwd"
                  @keyup.enter="login"
                  class="block w-full rounded-md border-2 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="mt-14 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              @click="login"
              class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
            >
              로그인
            </button>
          </div>
          <div class="mt-2 flex items-center justify-center gap-x-6">
            <RouterLink
              :to="{ name: 'signup' }"
              class="text-gray-500 text-sm hover:text-main-color hover:no-underline"
              >회원가입</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-box {
  height: 75vh;
  width: 80vh;
  position: absolute;
  background-color: white;
  box-shadow: 4px 4px 20px gray;
}
</style>
