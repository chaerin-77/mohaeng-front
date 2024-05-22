<script setup>
import { RouterView, useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import ChatBot from "@/components/chatbot/ChatBot.vue";

const showNavbar = ref(true);
const route = useRoute();
const isChatOpen = ref(false);

// 외부 클릭 감지를 위한 함수
const handleClickOutside = (event) => {
  const chatbotElement = document.querySelector(".chatbot");
  const chatbotIcon = document.querySelector(".chatbot-icon");
  if (
    isChatOpen.value &&
    chatbotElement &&
    !chatbotElement.contains(event.target) &&
    !chatbotIcon.contains(event.target)
  ) {
    isChatOpen.value = false;
  }
};
document.addEventListener("click", handleClickOutside);
watchEffect(() => {
  // 특정 페이지에 대한 meta 정보 확인
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
      <ChatBot
        :isChatOpen="isChatOpen"
        @toggleChat="isChatOpen = !isChatOpen"
        @openChat="isChatOpen = true"
      />
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
