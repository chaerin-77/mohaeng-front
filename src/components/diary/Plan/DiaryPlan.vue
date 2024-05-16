<script setup>
import DiaryPlanTrip from "./DiaryPlanTrip.vue";
import DiaryPlanAdd from "./DiaryPlanAdd.vue";
</script>

<template>
  <div>
    <p class="text-xl font-semibold mb-3">여행 계획</p>
    <DiaryPlanTrip />
  </div>
  <div class="mt-12">
    <p class="text-xl font-semibold mb-3">계획 추가하기</p>
    <DiaryPlanAdd />
  </div>
</template>

<style scoped></style>
