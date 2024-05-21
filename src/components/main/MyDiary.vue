<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const props = defineProps({ group: Object });
const groupStore = useGroupStore();
</script>

<template>
  <div class="flex mb-4 p-5 border border-gray-500 rounded-xl shadow-md">
    <div class="bg-gray-500 h-48 w-36"></div>
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
      <RouterLink
        :to="{ name: 'diaryHome' }"
        @click="groupStore.setCurGroup(group)"
        class="text-main-color font-semibold hover:no-underline"
      >
        다이어리 확인하기 >
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
