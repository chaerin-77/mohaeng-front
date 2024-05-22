<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
import { ref } from "vue";
import Alarm from "./user/Alarm.vue";

const showModal = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const groupStore = useGroupStore();
const { logout } = authStore;
const userlogout = () => {
  logout();
};
console.log("alarm: ", groupStore.alarmList);
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto py-2">
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
                <div
                  v-if="groupStore.alarmList.length > 0"
                  class="rounded-full bg-red-500 w-2 h-2 absolute ml-2"
                ></div>
                <font-awesome-icon icon="bell" class="mr-1" /> 알림
              </a>
            </li>
            <li>
              <RouterLink :to="{ name: 'myinfo' }" class="text-gray-600">
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
