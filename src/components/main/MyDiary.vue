<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
import groupApi from "@/api/groupApi";

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const props = defineProps({ group: Object });
const groupStore = useGroupStore();
// groupStore.getMemberInfo(props.group);
// console.log("group: ", props.group);

const setting = async () => {
  await groupStore.setCurGroup(props.group);
  router.push({ name: "diaryHome" });
};

const removeGroup = async (group) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  await groupApi.delete("", {
    params: {
      groupId: group.groupId,
    },
    headers: { Authorization: `Bearer ${authStore.token}` },
  });
  groupStore.getGroupList();
};
</script>

<template>
  <div
    class="relative flex flex-wrap mb-4 p-5 border border-gray-500 rounded-xl shadow-md"
  >
    <div
      class="h-48 w-36 ml-4"
      :style="`background-image: url(${group.groupImg}); background-size: cover; background-position: center;`"
    ></div>
    <div class="ml-10">
      <p class="font-semibold text-lg text-gray-600">{{ group.groupTitle }}</p>
      <p class="text-md text-gray-600 mt-2">
        {{ group.startDate }} ~ {{ group.endDate }}
      </p>
      <p class="text-md text-gray-600 mt-2">{{ group.groupName }}</p>
      <p class="text-md text-gray-600 mt-5 w-52 flex flex-wrap">
        멤버:
        <span v-for="member in group.memberList" :key="member.id" class="ml-2">
          {{ member.userName }}
        </span>
      </p>
    </div>
    <div class="ml-20 flex flex-col justify-between">
      <a
        href="#"
        @click="setting"
        class="text-main-color font-semibold hover:no-underline"
      >
        다이어리 확인하기 >
      </a>
      <div class="text-right">
        <font-awesome-icon
          icon="fa-regular fa-trash-can"
          class="text-red-400 w-5 h-5 mt-1 hover:text-gray-400"
          @click="removeGroup(group)"
        />
      </div>
    </div>
    <div
      class="absolute z-10 rounded-full w-5 h-5 bg-white border-2 border-gray-300 left-[1.5rem] top-[4rem] shadow-inner"
    ></div>
    <div
      class="absolute z-10 rounded-full w-5 h-5 bg-white border-2 border-gray-300 left-[1.5rem] top-[8rem] shadow-inner"
    ></div>
    <div
      class="absolute z-10 rounded-full w-5 h-5 bg-white border-2 border-gray-300 left-[1.5rem] top-[12rem] shadow-inner"
    ></div>
  </div>
</template>

<style scoped></style>
