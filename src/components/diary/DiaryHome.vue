<script setup></script>

<template>
  <div>
    <div class="flex mb-3 justify-between">
      <p class="text-xl font-semibold">공지 사항</p>
      <div class="flex">
        <p class="text-main-color mr-2">공지 등록하기</p>
        <font-awesome-icon icon="plus" size="lg" class="text-main-color" />
      </div>
    </div>
    <div>
      <div class="bg-gray-100 w-full pt-3 pb-3 pl-4 pr-4 rounded-lg mb-2">
        <div class="flex">
          <font-awesome-icon
            icon="circle-exclamation"
            size="lg"
            class="mr-3 mt-1 text-orange-300"
          />
          <p class="text-lg">다들 수건 꼭 챙겨오기!!</p>
        </div>
      </div>
      <div class="bg-gray-100 w-full pt-3 pb-3 pl-4 pr-4 rounded-lg mb-2">
        <div class="flex">
          <font-awesome-icon
            icon="circle-exclamation"
            size="lg"
            class="mr-3 mt-1 text-orange-300"
          />
          <p class="text-lg">다들 수건 꼭 챙겨오기!!</p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between mt-12">
    <div class="w-1/2">
      <p class="text-xl font-semibold">To Do List</p>
    </div>
    <div class="w-1/2">
      <p class="text-xl font-semibold">Talk</p>
    </div>
  </div>
</template>

<style scoped></style>
