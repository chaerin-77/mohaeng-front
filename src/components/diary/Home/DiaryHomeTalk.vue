<script setup>
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/auth";
const chatStore = useChatStore();
const authStore = useAuthStore();
</script>

<template>
  <div class="mb-3">
    <div
      v-for="chat in chatStore.chatList"
      :key="chat.chatId"
      class="bg-white py-2 px-3 rounded-md mb-3"
    >
      <div class="flex justify-between">
        <p class="font-semibold mb-2">{{ chat.userName }}</p>
        <font-awesome-icon
          v-if="authStore.user.id === chat.userId"
          icon="fa-regular fa-trash-can"
          class="text-gray-400 w-4 h-4 mt-1 hover:text-red-400"
          @click="chatStore.removeChat(chat.chatId)"
        />
      </div>
      <p>{{ chat.content }}</p>
    </div>
  </div>
</template>

<style scoped></style>
