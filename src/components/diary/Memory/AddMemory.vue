<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  router.go(-1);
};
</script>

<template>
  <div class="px-5 grid place-items-center">
    <p class="text-xl font-semibold mb-4 text-center">추억 작성하기</p>
    <div class="border border-main-color w-full p-5 mb-5">
      <form>
        <div>
          <p class="mb-3">오늘 너무 재밌었어~</p>
          <div class="bg-gray-500 w-52 h-32"></div>
        </div>
      </form>
    </div>
    <div class="flex gap-x-5">
      <button
        @click="back"
        class="px-4 py-2 text-sm text-main-color border-2 border-main-color rounded-md focus:outline-none hover:bg-gray-300"
      >
        취소하기
      </button>
      <button
        class="px-4 py-2 text-sm text-white bg-main-color rounded-md focus:outline-none hover:bg-gray-300"
      >
        등록하기
      </button>
    </div>
  </div>
</template>

<style scoped></style>
