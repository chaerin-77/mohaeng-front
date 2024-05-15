<script setup>
import { RouterView, useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

const showNavbar = ref(true);
const route = useRoute();

watchEffect(() => {
  // 특정 페이지에 대한 meta 정보 확인
  console.log(route.meta.showNavbar);
  showNavbar.value = route.meta.showNavbar; // 네비게이션 바를 숨김
});
</script>

<template>
  <div class="font-[Pretendard]">
    <div v-if="showNavbar">
      <Navigation />
    </div>
    <router-view></router-view>
    <div v-if="showNavbar">
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
