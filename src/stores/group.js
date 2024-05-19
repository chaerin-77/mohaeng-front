import { ref } from "vue";
import { defineStore } from "pinia";
import groupApi from "@/api/groupApi";
import authApi from "@/api/authApi";
import { useAuthStore } from "@/stores/auth";

export const useGroupStore = defineStore("group", () => {
  const userList = ref([]);
  const memberList = ref([]);
  const memberIntList = ref([]);
  const authStore = useAuthStore();

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

    // 나 자신을 검색하지 않도록
    // filteredUsers.value = filteredUsers.value.filter(
    //   (user) => user.id !== authStore.user.id
    // );

    userList.value = filteredUsers;
  };

  const addMember = (user) => {
    memberList.value.push(user);
    memberIntList.value.push(user.userId);

    // 선택된 유저 제거
    userList.value = userList.value.filter(
      (search) => user.userId !== search.userId
    );
  };

  const removeMember = (user) => {
    memberList.value = memberList.value.filter(
      (member) => member.userId !== user.userId
    );
    memberIntList.value = memberIntList.value.filter(
      (id) => id !== user.userId
    );
  };

  // 그룹 생성하기
  const createGroup = async (groupInfo) => {
    // 내 정보를 추가해서 보내기
    memberIntList.value.push(authStore.user.id);

    // 요청 객체 생성 후 전송
    const requestMakegroup = { groupInfo: groupInfo, userList: memberIntList };
    const response = await groupApi.post(requestMakegroup.value);
  };

  return {
    userList,
    memberList,
    findUser,
    addMember,
    removeMember,
    createGroup,
  };
});
