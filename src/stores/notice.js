import { ref } from "vue";
import { defineStore } from "pinia";
import noticeApi from "@/api/noticeApi";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";

export const useNoticeStore = defineStore(
  "notice",
  () => {
    const authStore = useAuthStore();
    const groupStore = useGroupStore();
    const noticeList = ref([]);

    const getNoticeList = async () => {
      const response = await noticeApi.get("", {
        params: {
          groupId: groupStore.curgroup.groupId,
        },
      });
      noticeList.value = response.data;
    };

    const addNotice = async (content) => {
      const obj = { groupId: groupStore.curgroup.groupId, content: content };
      const response = await noticeApi.post("", obj, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getNoticeList();
    };

    const removeNotice = async (id) => {
      const response = await noticeApi.delete(
        "",
        {
          params: {
            noticeId: id,
          },
        },
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );
      getNoticeList();
    };

    return { noticeList, getNoticeList, addNotice, removeNotice };
  },
  { persist: { storage: sessionStorage } }
);
