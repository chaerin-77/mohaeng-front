<script setup>
import DiaryHomeNotice from "./DiaryHomeNotice.vue";
import DiaryHomeToDo from "./DiaryHomeToDo.vue";
import DiaryHomeTalk from "./DiaryHomeTalk.vue";
</script>

<template>
  <div>
    <div class="flex mb-3 justify-between">
      <p class="text-xl font-semibold">공지 사항</p>
      <div class="flex">
        <p class="text-main-color mr-2">공지 등록하기</p>
        <font-awesome-icon icon="plus" size="lg" class="text-main-color" />
      </div>
    </div>
    <DiaryHomeNotice />
  </div>
  <div class="flex justify-between mt-12">
    <div class="w-1/2">
      <p class="text-xl font-semibold">To Do List</p>
      <DiaryHomeToDo />
    </div>
    <div class="w-1/2">
      <p class="text-xl font-semibold">Talk</p>
      <DiaryHomeTalk />
    </div>
  </div>
</template>

<style scoped></style>
