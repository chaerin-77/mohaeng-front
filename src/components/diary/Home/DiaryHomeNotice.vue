<script setup>
import { useNoticeStore } from "@/stores/notice";
const noticeStore = useNoticeStore();
</script>

<template>
  <div>
    <div
      v-for="notice in noticeStore.noticeList"
      :key="notice.noticeId"
      class="bg-gray-100 w-full pt-3 pb-3 pl-4 pr-4 rounded-lg mb-2"
    >
      <div class="flex justify-between">
        <div class="flex">
          <font-awesome-icon
            icon="circle-exclamation"
            size="lg"
            class="mr-3 mt-1 text-orange-300"
          />
          <p class="text-lg">{{ notice.content }}</p>
        </div>
        <font-awesome-icon
          icon="fa-regular fa-trash-can"
          class="text-red-400 w-5 h-5 mt-1 hover:text-gray-400"
          @click="noticeStore.removeNotice(notice.noticeId)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
