<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const props = defineProps({ group: Object });
const groupStore = useGroupStore();
groupStore.getMemberInfo(props.group);
console.log("group: ", props.group);

const setting = async () => {
  await groupStore.setCurGroup(props.group);
  router.push({ name: "diaryHome" });
};
</script>

<template>
  <div class="flex mb-4 p-5 border border-gray-500 rounded-xl shadow-md">
    <div
      class="h-48 w-36"
      :style="`background-image: url(${group.groupImg}); background-size: cover; background-position: center;`"
    ></div>
    <div class="ml-10">
      <p class="font-semibold text-lg text-gray-600">{{ group.groupTitle }}</p>
      <p class="text-md text-gray-600 mt-2">
        {{ group.startDate }} ~ {{ group.endDate }}
      </p>
      <p class="text-md text-gray-600 mt-2">{{ group.groupName }}</p>
      <p class="text-md text-gray-600 mt-5 flex">
        멤버:
        <span
          v-for="member in groupStore.curgroupInfo"
          :key="member.id"
          class="ml-2"
        >
          {{ member.userName }}
        </span>
      </p>
    </div>
    <div class="ml-20">
      <a
        href="#"
        @click="setting"
        class="text-main-color font-semibold hover:no-underline"
      >
        다이어리 확인하기 >
      </a>
    </div>
  </div>
</template>

<style scoped></style>
