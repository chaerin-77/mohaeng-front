<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<template>
  <p class="text-gray-500 text-xl font-semibold mb-5">나의 다이어리</p>
  <div class="flex p-5 border border-gray-500 rounded-xl shadow-md">
    <div class="bg-gray-500 h-48 w-36"></div>
    <div class="ml-10">
      <p class="font-semibold text-lg text-gray-600">친구들과 광주 나들이</p>
      <p class="text-md text-gray-600 mt-2">2024.05.08 ~ 2024.05.10</p>
      <p class="text-md text-gray-600 mt-2">동기 모임</p>
      <p class="text-md text-gray-600 mt-5">
        멤버: 김민경, 고승희, 홍경현, 정채린
      </p>
    </div>
    <div class="ml-20">
      <RouterLink
        :to="{ name: 'diaryHome' }"
        class="text-main-color font-semibold hover:no-underline"
      >
        다이어리 확인하기 >
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
