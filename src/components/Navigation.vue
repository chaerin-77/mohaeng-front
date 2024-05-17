<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import Alarm from "./user/Alarm.vue";

const showModal = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const { logout } = authStore;
const userlogout = () => {
  logout();
};
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="text-white font-bold text-xl">
          <RouterLink :to="{ name: 'main' }">
            <img src="/src/assets/logo.png" alt="logo" class="h-14" />
          </RouterLink>
        </div>
        <div class="hidden md:block">
          <ul class="flex items-center space-x-10">
            <li>
              <a href="#" class="text-gray-600" @click="showModal = true">
                <font-awesome-icon icon="bell" class="mr-1" /> 알림
              </a>
            </li>
            <li>
              <RouterLink :to="{ name: 'mypage' }" class="text-gray-600">
                <font-awesome-icon icon="user" class="mr-1" /> 마이페이지
              </RouterLink>
            </li>
            <li>
              <router-link
                :to="{ name: 'login' }"
                @click.prevent="userlogout"
                class="text-gray-600"
              >
                <font-awesome-icon icon="right-from-bracket" class="mr-1" />
                로그아웃
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <Alarm v-model="showModal" />
</template>

<style scoped></style>
