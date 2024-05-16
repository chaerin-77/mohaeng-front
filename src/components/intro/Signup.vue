<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

/* 비밀번호 일치 여부 체크 */
const password = ref("");
const confirmPassword = ref("");
const passwordMatch = ref(true);

const checkPasswordMatch = () => {
  passwordMatch.value = password.value === confirmPassword.value;
};

const joinForm = ref({
  userId: "",
  userPwd: password,
  userName: "",
  userPhone: "",
  birthday: "",
});

const join = async () => {
  if (!confirm("이대로 가입하시겠습니까?")) return;
  try {
    await authStore.join(joinForm.value);
    router.push("/");
  } catch (error) {
    console.error("에러:", error);
    alert("가입 실패");
  }
};
</script>

<template>
  <div class="absolute pt-24 pb-24 pl-36 pr-36 bg-white shadow-md">
    <div class="grid place-items-center">
      <img src="/src/assets/logo-text.png" alt="" class="block w-30" />
      <div class="grid gap-x-6 gap-y-8">
        <form @submit.prevent="join">
          <div class="flex">
            <div class="mt-10 mr-5">
              <div class="w-80 mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-900"
                  >아이디</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    v-model.trim="joinForm.userId"
                    required
                    class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-900"
                  >비밀번호</label
                >
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="password"
                    required
                    @input="checkPasswordMatch"
                    class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="ckpassword"
                  class="block text-sm font-medium text-gray-900"
                  >비밀번호 확인</label
                >
                <div class="mt-2">
                  <input
                    id="ckpassword"
                    name="ckpassword"
                    type="password"
                    v-model="confirmPassword"
                    @input="checkPasswordMatch"
                    class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
                <!-- 비밀번호 일치 여부를 표시하는 메시지 -->
                <p v-if="!passwordMatch" class="text-red-500 text-xs mt-1">
                  비밀번호가 일치하지 않습니다.
                </p>
              </div>
            </div>
            <div class="mt-10">
              <div class="w-80 mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-900"
                  >이름</label
                >
                <div class="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    v-model.trim="joinForm.userName"
                    required
                    class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-900"
                  >전화번호</label
                >
                <div class="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    v-model.trim="joinForm.userPhone"
                    required
                    class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="birthday"
                  class="block text-sm font-medium text-gray-900"
                  >생년월일</label
                >
                <div class="mt-2">
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    v-model.trim="joinForm.birthday"
                    required
                    class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-14 flex items-center justify-center gap-x-6">
            <input
              type="submit"
              class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
              value="회원가입"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
