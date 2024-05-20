<script setup>
import DiaryHomeNotice from "./DiaryHomeNotice.vue";
import DiaryHomeToDo from "./DiaryHomeToDo.vue";
import DiaryHomeTalk from "./DiaryHomeTalk.vue";
import NoticeAdd from "./NoticeAdd.vue";
import { useChatStore } from "@/stores/chat";
import { ref } from "vue";
const showModal = ref(false);
const content = ref("");
const chatStore = useChatStore();
const addChat = () => {
  if (content.value.length > 0) {
    chatStore.addChat(content.value);
    content.value = "";
  }
};
</script>

<template>
  <div>
    <div class="flex mb-3 justify-between">
      <p class="text-xl font-semibold">공지 사항</p>
      <button class="flex hover:text-orange-300" @click="showModal = true">
        <span class="text-main-color hover:text-orange-300 mr-2 underline"
          >공지 등록하기</span
        >
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
      <div class="bg-main-color rounded-xl w-full p-4">
        <DiaryHomeTalk />
      </div>
      <!-- talk 입력 -->
      <div class="input-group mt-3">
        <input
          type="text"
          class="form-control mr-3 rounded-md"
          v-model="content"
          @keypress.enter="addChat()"
          placeholder="talk 작성 ..."
        />
        <button
          class="bg-main-color text-white px-3 rounded-md hover:bg-gray-400"
          type="button"
          @keyup.enter="addChat()"
          @click="addChat()"
        >
          <font-awesome-icon
            icon="fa-regular fa-paper-plane"
            class="text-white"
          />
        </button>
      </div>
    </div>
  </div>
  <NoticeAdd v-model="showModal" />
</template>

<style scoped></style>
