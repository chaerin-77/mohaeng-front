<script setup>
import { ref } from "vue";

const password = ref("");
const confirmPassword = ref("");
const passwordMatch = ref(true);

const checkPasswordMatch = () => {
  passwordMatch.value = password.value === confirmPassword.value;
};
</script>

<template>
  <div class="signup-box">
    <div class="container grid place-items-center mt-16">
      <img
        src="/src/assets/logo-text.png"
        alt=""
        class="block w-30 justify-center"
      />
      <div class="grid col-span-full gap-x-6 gap-y-8">
        <form>
          <div class="mt-10 grid gap-x-6 gap-y-8">
            <div class="w-80">
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
                  class="block w-full rounded-md border-2 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="w-80">
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
                  v-model="password"
                  @input="checkPasswordMatch"
                  class="block w-full rounded-md border-2 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="w-80">
              <label
                for="ckpassword"
                class="block text-sm font-medium leading-6 text-gray-900"
                >비밀번호 확인</label
              >
              <div class="mt-2">
                <input
                  id="ckpassword"
                  name="ckpassword"
                  type="password"
                  v-model="confirmPassword"
                  @input="checkPasswordMatch"
                  class="block w-full rounded-md border-2 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <!-- 비밀번호 일치 여부를 표시하는 메시지 -->
              <p v-if="!passwordMatch" class="text-red-500 text-xs mt-1">
                비밀번호가 일치하지 않습니다.
              </p>
            </div>
            <div class="w-80">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >이름</label
              >
              <div class="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autocomplete="name"
                  class="block w-full rounded-md border-2 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="w-80">
              <label
                for="phone"
                class="block text-sm font-medium leading-6 text-gray-900"
                >전화번호</label
              >
              <div class="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autocomplete="phone"
                  class="block w-full rounded-md border-2 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="mt-14 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-box {
  height: 100%;
  width: 80vh;
  position: absolute;
  align-items: center;
  justify-items: center;
  background-color: white;
  box-shadow: 4px 4px 20px gray;
}
</style>
