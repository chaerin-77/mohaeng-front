<script setup>
import { RouterView, useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import Navigation from "./components/Navigation.vue";

const showNavbar = ref(true);
const route = useRoute();

watchEffect(() => {
  // 특정 페이지에 대한 meta 정보 확인
  if (!route.meta.showNavbar) {
    showNavbar.value = false; // 네비게이션 바를 숨김
  }
});
</script>

<template>
  <div v-if="showNavbar">
    <Navigation />
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
