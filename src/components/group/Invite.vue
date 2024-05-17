<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import SearchMember from "./SearchMember.vue";
import MemberList from "./MemberList.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const joinForm = ref({
  userId: "",
  userPwd: "",
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
  <form>
    <div class="flex py-5 justify-between">
      <div class="w-1/3 px-5">
        <div class="mb-4">
          <label for="gname" class="block text-sm font-medium text-gray-900"
            >모임 명</label
          >
          <div class="mt-2">
            <input
              id="gname"
              name="gname"
              type="text"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="gtitle" class="block text-sm font-medium text-gray-900"
            >모임 다이어리 제목</label
          >
          <div class="mt-2">
            <input
              id="gtitle"
              name="gtitle"
              type="text"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="gdate" class="block text-sm font-medium text-gray-900"
            >모임 날짜</label
          >
          <div class="mt-2 flex">
            <input
              id="startDate"
              name="gdate"
              type="date"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
            <p>~</p>
            <input
              id="endDate"
              name="gdate"
              type="date"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="gfile" class="block text-sm font-medium text-gray-900"
            >모임 이미지</label
          >
          <div class="mt-2">
            <input
              id="gfile"
              name="gfile"
              type="text"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
      </div>
      <SearchMember class="w-1/3 px-5" />
      <MemberList class="w-1/3 px-5" />
    </div>
  </form>
</template>

<style scoped></style>
