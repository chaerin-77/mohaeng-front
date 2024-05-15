<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const { userLogout } = memberStore;
const logout = () => {
  userLogout();
};
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="text-white font-bold text-xl">
          <a href="#"
            ><img src="/src/assets/logo.png" alt="logo" class="h-14"
          /></a>
        </div>
        <div class="hidden md:block">
          <ul class="flex items-center space-x-10">
            <li>
              <a href="#" class="text-gray-600 font-semibold">
                <font-awesome-icon icon="bell" /> 알림</a
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'mypage' }"
                class="text-gray-600 font-semibold"
              >
                <font-awesome-icon icon="user" /> 마이페이지
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'login' }"
                @click.prevent="logout"
                class="text-gray-600 font-semibold"
              >
                <font-awesome-icon icon="right-from-bracket" /> 로그아웃
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
