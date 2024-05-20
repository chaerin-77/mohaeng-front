<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import MyDiary from "@/components/main/MyDiary.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<template>
  <div class="bg-main-color p-20">
    <div class="container flex justify-between">
      <div class="w-3/5">
        <h1 class="text-white text-xl font-semibold mb-6">내 프로필</h1>
        <div class="bg-white rounded-2xl p-5 flex">
          <div class="bg-gray-500 h-40 w-32"></div>
          <div class="ml-10">
            <p class="font-semibold text-lg text-gray-600">
              {{ user.userName }}
            </p>
            <p class="text-md text-gray-600 mt-2">{{ user.birthday }}</p>
            <p class="text-md text-gray-600 mt-5">{{ user.message }}</p>
          </div>
        </div>
        <div class="bg-gray-500 p-4 text-center rounded-xl">
          <RouterLink :to="{ name: 'myinfo' }" class="hover: no-underline"
            ><p class="text-white">내 정보 수정하기 ></p></RouterLink
          >
        </div>
      </div>
      <div class="ml-10 w-full">
        <h1 class="text-white text-xl font-semibold mb-6">내 여행 모임</h1>
        <div class="flex p-5 border-2 border-white rounded-2xl">
          <div class="text-center m-3">
            <div class="rounded-full border-2 border-white w-20 h-20"></div>
            <p class="text-white text-md mt-3">동기 모임</p>
          </div>
          <div class="text-center m-3">
            <RouterLink :to="{ name: 'invite' }">
              <div
                class="hover:shadow-xl rounded-full bg-orange-300 w-20 h-20 pt-4"
              >
                <font-awesome-icon
                  icon="plus"
                  style="color: white"
                  size="2xl"
                />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container pt-20">
    <MyDiary />
  </div>
</template>

<style scoped></style>
