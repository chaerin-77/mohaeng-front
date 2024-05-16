<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Invite from "@/components/group/Invite.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<template>
  <div class="container pt-20">
    <p class="text-gray-500 text-xl font-semibold mb-5">모임 추가하기</p>
    <div>
      <Invite />
    </div>
  </div>
</template>

<style scoped></style>
