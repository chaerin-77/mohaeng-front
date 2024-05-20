import { ref, computed } from "vue";
import { defineStore } from "pinia";
import chatApi from "@/api/chatApi";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";

export const useChatStore = defineStore(
  "chat",
  () => {
    const authStore = useAuthStore();
    const groupStore = useGroupStore();
    const chatList = ref([]);

    const getChatlist = async () => {
      const response = await chatApi.get("", {
        params: {
          groupId: groupStore.curgroup.groupId,
        },
      });
      chatList.value = response.data;
      getMemberName();
    };

    const getMemberName = () => {
      const userIdToName = {};
      groupStore.curgroupInfo.forEach((member) => {
        userIdToName[member.id] = member.userName;
      });
      chatList.value = chatList.value.map((chat) => {
        const userName = userIdToName[chat.userId];
        return { ...chat, userName };
      });
    };

    const addChat = async (content) => {
      const obj = {
        content,
        userId: authStore.user.id,
        groupId: groupStore.curgroup.groupId,
      };
      const response = await chatApi.post("", obj, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getChatlist();
    };

    const removeChat = async (chatId) => {
      const response = await chatApi.delete(
        "",
        {
          params: {
            chatId,
            userId: authStore.user.id,
          },
        },
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );
      getChatlist();
    };

    return { chatList, getChatlist, addChat, getMemberName, removeChat };
  },
  {
    persist: { storage: sessionStorage },
  }
);
