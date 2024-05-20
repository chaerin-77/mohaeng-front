import { ref } from "vue";
import { defineStore } from "pinia";
import groupApi from "@/api/groupApi";
import authApi from "@/api/authApi";
import { useAuthStore } from "@/stores/auth";

export const useGroupStore = defineStore(
  "group",
  () => {
    const authStore = useAuthStore();
    const userList = ref([]);
    const memberList = ref([]);
    const memberIntList = ref([]);
    const groupList = ref([]);

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
      memberIntList.value.push(user.id);

      // 선택된 유저 제거
      userList.value = userList.value.filter(
        (search) => user.userId !== search.userId
      );
    };

    const removeMember = (user) => {
      memberList.value = memberList.value.filter(
        (member) => member.userId !== user.userId
      );
      memberIntList.value = memberIntList.value.filter((id) => id !== user.id);
    };

    // 그룹 생성하기
    const createGroup = async (groupInfo) => {
      // 내 정보를 추가해서 보내기
      memberIntList.value.push(authStore.user.id);

      // 요청 객체 생성 후 전송
      const requestMakegroup = {
        groupInfo: groupInfo,
        userList: memberIntList.value,
      };
      const response = await groupApi.post("", requestMakegroup, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      memberList.value = [];
      memberIntList.value = [];
    };

    const getGroupList = async () => {
      const response = await groupApi.get("/list", {
        params: {
          userId: authStore.user.id,
        },
      });
      groupList.value = response.data;
      console.log(groupList.value);
    };

    return {
      userList,
      memberList,
      groupList,
      findUser,
      addMember,
      removeMember,
      createGroup,
      getGroupList,
    };
  },
  { persist: { storage: sessionStorage } }
);
