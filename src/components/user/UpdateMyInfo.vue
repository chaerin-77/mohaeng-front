<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;

const updateForm = ref({
  id: user.id,
  userId: user.userId,
  userName: user.userName,
  userPhone: user.userPhone,
  birthday: user.birthday,
});

const update = async () => {
  if (!confirm("이대로 수정하시겠습니까?")) return;
  try {
    await authStore.update(updateForm.value);
    router.push("/");
  } catch (error) {
    console.error("에러:", error);
    alert("수정 실패");
  }
};
</script>

<template>
  <div>
    <p class="text-gray-500 text-xl font-semibold mb-3">내 정보 수정하기</p>
  </div>
  <div class="grid gap-x-6 gap-y-8 place-items-center">
    <form @submit.prevent="update">
      <div class="mt-10">
        <div class="mb-4 flex place-items-center">
          <label
            for="email"
            class="block text-sm font-medium text-gray-900 mr-5"
            >아이디</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model.trim="updateForm.userId"
              readonly
              class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>
        <div class="mb-4 flex place-items-center">
          <label for="name" class="mr-5 block text-sm font-medium text-gray-900"
            >이름</label
          >
          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              v-model.trim="updateForm.userName"
              required
              class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>
        <div class="mb-4 flex place-items-center">
          <label
            for="phone"
            class="mr-5 block text-sm font-medium text-gray-900"
            >전화번호</label
          >
          <div class="mt-2">
            <input
              id="phone"
              name="phone"
              type="phone"
              v-model.trim="updateForm.userPhone"
              required
              class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>
        <div class="mb-4 flex place-items-center">
          <label
            for="birthday"
            class="mr-5 block text-sm font-medium text-gray-900"
            >생년월일</label
          >
          <div class="mt-2">
            <input
              id="birthday"
              name="birthday"
              type="date"
              v-model.trim="updateForm.birthday"
              required
              class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>
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
