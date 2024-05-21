<script setup>
import { RouterView, RouterLink, useRoute } from "vue-router";
</script>

<template>
  <div>
    <div class="flex mb-4 justify-between">
      <p class="text-xl font-semibold">우리만의 추억들</p>
      <RouterLink :to="{ name: 'addMemory' }" class="hover:text-orange-300">
        <span class="text-main-color hover:text-orange-300 mr-2 underline"
          >추억 작성하기</span
        >
      </RouterLink>
    </div>
    <div class="bg-gray-100 p-4 mx-5">
      <div>
        <div class="flex place-items-center">
          <div class="bg-gray-500 w-10 h-12"></div>
          <div class="ml-3">
            <p class="font-semibold">정채린</p>
            <p class="text-gray-500">2024-05-21</p>
          </div>
        </div>
        <hr class="my-4" />
        <div class="text-center grid place-items-center">
          <div class="bg-gray-500 w-96 h-72"></div>
          <p class="mt-3">오늘 너무 재밌었어~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
