<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="background">
    <div class="yellow-box"></div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.background {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-image: url("/src/assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
}
.yellow-box {
  height: 100vh;
  width: 45%;
  margin: 0;
  background-color: #f2bc57;
  /* 오른쪽에 배치하기 위한 추가 스타일 */
  position: absolute;
  right: 0; /* 오른쪽 정렬 */
}
</style>
