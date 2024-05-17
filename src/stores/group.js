import { ref } from "vue";
import { defineStore } from "pinia";
import groupApi from "@/api/groupApi";
import authApi from "@/api/authApi";

export const useGroupStore = defineStore("group", () => {
  const userList = ref([]);
  const memberList = ref([]);
  const memberIntList = ref([]);

  const findUser = async (word) => {
    const response = await authApi.get("/search", {
      params: {
        keyword: word,
      },
    });

    // memberList에 없는 사용자만 userList에 추가
    const filteredUsers = response.data.filter(
      (user) =>
        !memberList.value.some((member) => member.userId === user.userId)
    );

    userList.value = filteredUsers;
  };

  const addMember = (user) => {
    memberList.value.push(user);
    memberIntList.value.push(user.userId);
  };

  const removeMember = (user) => {
    memberList.value = memberList.value.filter(
      (member) => member.userId !== user.userId
    );
    memberIntList.value = memberIntList.value.filter(
      (id) => id !== user.userId
    );
  };

  return { userList, memberList, findUser, addMember, removeMember };
});
