<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import SearchMember from "./SearchMember.vue";
import MemberList from "./MemberList.vue";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
const groupStore = useGroupStore();
const authStore = useAuthStore();
const router = useRouter();

const groupForm = ref({
  groupName: "",
  groupTitle: "",
  groupImg: "",
  startDate: "",
  endDate: "",
});

const createGroup = async () => {
  if (!confirm("이대로 모임을 생성하시겠습니까?")) return;
  try {
    await groupStore.createGroup(groupForm.value);
    router.push("/");
  } catch (error) {
    console.error("에러:", error);
    alert("모임 생성 실패");
  }
};
</script>

<template>
  <form @submit.prevent="createGroup">
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
              v-model.trim="groupForm.groupName"
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
              v-model.trim="groupForm.groupTitle"
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
              v-model.trim="groupForm.startDate"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
            <p>~</p>
            <input
              id="endDate"
              name="gdate"
              type="date"
              v-model.trim="groupForm.endDate"
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
              v-model.trim="groupForm.groupImg"
              required
              class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
      </div>
      <SearchMember class="w-1/3 px-5" />
      <MemberList class="w-1/3 px-5" />
    </div>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <input
        type="submit"
        class="rounded-xl bg-orange-300 px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        value="모임 만들기"
      />
    </div>
  </form>
</template>

<style scoped></style>
