<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;
/* 비밀번호 일치 여부 체크 */
const password = ref("");
const confirmPassword = ref("");
const passwordMatch = ref(true);

const checkPasswordMatch = () => {
  passwordMatch.value = password.value === confirmPassword.value;
};

const updatePwdForm = ref({
  id: user.id,
  userPwd: password,
});

const updatePwd = async () => {
  if (!confirm("이대로 수정하시겠습니까?")) return;
  if (passwordMatch) {
    try {
      await authStore.updatePwd(updatePwdForm.value);
      router.push("/");
    } catch (error) {
      console.error("에러:", error);
      alert("수정 실패");
    }
  }
};
</script>

<template>
  <div>
    <p class="text-gray-500 text-xl font-semibold mb-24">비밀번호 변경하기</p>
  </div>
  <div class="grid place-items-center">
    <form @submit.prevent="updatePwd">
      <div class="mb-14">
        <label for="password" class="block text-sm font-medium text-gray-900"
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
            class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />
        </div>
      </div>
      <div class="mb-14">
        <label for="ckpassword" class="block text-sm font-medium text-gray-900"
          >비밀번호 확인</label
        >
        <div class="mt-2">
          <input
            id="ckpassword"
            name="ckpassword"
            type="password"
            v-model="confirmPassword"
            @input="checkPasswordMatch"
            class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />
        </div>
        <!-- 비밀번호 일치 여부를 표시하는 메시지 -->
        <p v-if="!passwordMatch" class="text-red-500 text-xs mt-1">
          비밀번호가 일치하지 않습니다.
        </p>
      </div>

      <div class="mt-20 flex items-center justify-center gap-x-6">
        <input
          type="submit"
          class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
          value="수정하기"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
