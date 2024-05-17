<script setup>
import DiaryHomeNotice from "./DiaryHomeNotice.vue";
import DiaryHomeToDo from "./DiaryHomeToDo.vue";
import DiaryHomeTalk from "./DiaryHomeTalk.vue";
import NoticeAdd from "./NoticeAdd.vue";
import { ref } from "vue";
const showModal = ref(false);
</script>

<template>
  <div>
    <div class="flex mb-3 justify-between">
      <p class="text-xl font-semibold">공지 사항</p>
      <button class="flex hover:text-orange-300" @click="showModal = true">
        <span class="text-main-color hover:text-orange-300 mr-2 underline"
          >공지 등록하기</span
        >
        <!-- <font-awesome-icon icon="plus" size="lg" class="text-main-color" /> -->
      </button>
    </div>
    <DiaryHomeNotice />
  </div>
  <div class="flex justify-between mt-12">
    <div class="w-1/2 mr-4">
      <p class="text-xl font-semibold mb-3">To Do List</p>
      <DiaryHomeToDo />
    </div>
    <div class="w-1/2 ml-4">
      <p class="text-xl font-semibold mb-3">Talk</p>
      <div class="bg-main-color rounded-xl w-full h-full p-4">
        <DiaryHomeTalk />
      </div>
    </div>
  </div>
  <NoticeAdd v-model="showModal" />
</template>

<style scoped></style>
