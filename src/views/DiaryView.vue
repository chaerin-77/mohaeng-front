<script setup>
import { ref } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";

const route = useRoute();
const menu = ref("home");
</script>

<template>
  <div class="container pt-14">
    <div class="flex">
      <!--왼쪽 사이드 바-->
      <div class="text-center w-56 mt-2">
        <div class="mb-10">
          <span class="text-gray-500">TODAY </span>
          <span class="text-red-500"> 57 </span>
          <span class="text-gray-500"> | TOTAL </span>
          <span class="text-gray-500"> 200</span>
        </div>
        <!-- 왼쪽 상단 내 프로필 -->
        <div
          class="bg-main-color p-5 text-center rounded-xl grid place-items-center mb-5"
        >
          <div class="bg-gray-500 h-40 w-32"></div>
          <p class="text-white mt-4 text-lg">정채린</p>
          <p class="text-white mt-4 text-md font-light">여행은 늘 즐겁게~</p>
          <div class="mt-20">
            <p class="text-white mb-3">다른 모임</p>
            <div class="flex">
              <div
                class="rounded-full border-2 border-white w-12 h-12 mr-2"
              ></div>
              <div class="rounded-full bg-orange-300 w-12 h-12 pt-2.5">
                <font-awesome-icon icon="plus" style="color: white" size="xl" />
              </div>
            </div>
          </div>
        </div>
        <!-- 멤버 div -->
        <div class="bg-main-color p-5 rounded-xl">
          <p class="text-white text-lg mb-4">이 모임 멤버</p>
          <!-- member list -->
          <div class="flex">
            <div
              class="rounded-full border-2 border-white w-12 h-12 mr-2"
            ></div>
            <p class="text-white m-2 text-md">김민경</p>
          </div>
        </div>
      </div>
      <!-- 가운데 다이어리 -->
      <div class="ml-10 w-full">
        <div class="flex mb-10">
          <!-- title 부분 -->
          <div class="text-2xl font-semibold mr-5">
            <span>친구들과 부산 나들이 </span>
            <span>다이어리</span>
          </div>
          <!-- 날짜 부분 -->
          <div class="flex">
            <div class="text-xl font-medium text-gray-500 mr-5">
              <span>2024.05.08 </span>
              <span> ~ </span>
              <span> 2024.05.10</span>
            </div>
            <font-awesome-icon
              icon="pen-to-square"
              class="text-main-color h-5"
            />
          </div>
        </div>
        <!-- 다이어리 틀 부분 -->
        <div class="border-2 border-main-color p-5 rounded-xl grid">
          <router-view></router-view>
        </div>
      </div>
      <div class="mt-20">
        <router-link
          :to="{ name: 'diaryHome' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <div
            class="w-24 border-2 border-l-0 border-main-color grid place-items-center mb-2 pt-2 pb-2"
            :class="{ 'bg-main-color': route.name === 'diaryHome' }"
          >
            <p
              class="text-main-color"
              :class="{ 'text-white': route.name === 'diaryHome' }"
            >
              HOME
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'diaryPlan' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <div
            class="w-24 border-2 border-l-0 border-main-color grid place-items-center mb-2 pt-2 pb-2"
            :class="{ 'bg-main-color': route.name === 'diaryPlan' }"
          >
            <p
              class="text-main-color"
              :class="{ 'text-white': route.name === 'diaryPlan' }"
            >
              PLAN
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'diaryMemory' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <div
            class="w-24 border-2 border-l-0 border-main-color grid place-items-center pt-2 pb-2"
            :class="{ 'bg-main-color': route.name === 'diaryMemory' }"
          >
            <p
              class="text-main-color"
              :class="{ 'text-white': route.name === 'diaryMemory' }"
            >
              MEMORY
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
