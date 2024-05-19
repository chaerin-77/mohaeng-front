<script setup>
import { RouterView, RouterLink, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div class="container pt-20">
    <p class="text-gray-500 text-xl font-semibold mb-5">마이 페이지</p>
    <div class="flex justify-evenly">
      <!-- 왼쪽 navbar -->
      <div>
        <router-link
          :to="{ name: 'myinfo' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <p
            class="text-gray-400 text-xl my-3"
            :class="{
              'text-main-color': route.name === 'myinfo',
              'font-semibold': route.name === 'myinfo',
            }"
          >
            내 정보 수정하기
          </p>
        </router-link>
        <hr />
        <router-link
          :to="{ name: 'password' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <p
            class="text-gray-400 text-xl my-3"
            :class="{
              'text-main-color': route.name === 'password',
              'font-semibold': route.name === 'password',
            }"
          >
            비밀번호 변경하기
          </p>
        </router-link>
      </div>
      <div class="mt-3 w-4/5 px-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
