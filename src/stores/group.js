import { ref } from "vue";
import { defineStore } from "pinia";
import groupApi from "@/api/groupApi";
import authApi from "@/api/authApi";
import { useAuthStore } from "@/stores/auth";

export const useGroupStore = defineStore(
  "group",
  () => {
    const authStore = useAuthStore();
    const searchList = ref([]);
    const memberList = ref([]);
    // const memberIntList = ref([]);
    const addmemberList = ref([]);
    const addmemberIntList = ref([]);
    const groupList = ref([]);
    const curgroup = ref({});
    const alarmList = ref([]);

    const findUser = async (word) => {
      const response = await authApi.get("/search", {
        params: {
          keyword: word,
        },
      });

      // memberList에 없는 사용자만 searchList에 추가
      const filteredUsers = ref([]);
      filteredUsers.value = response.data.filter(
        (user) =>
          !memberList.value.some((member) => member.userId === user.userId)
      );

      // 나 자신을 검색하지 않도록
      filteredUsers.value = filteredUsers.value.filter(
        (user) => user.id !== authStore.user.id
      );

      searchList.value = filteredUsers.value;
    };

    const addMember = (user) => {
      // memberList.value.push(user);
      // memberIntList.value.push(user.id);
      addmemberList.value.push(user);
      addmemberIntList.value.push(user.id);

      // 선택된 유저 제거
      searchList.value = searchList.value.filter(
        (search) => user.userId !== search.userId
      );
    };

    const removeMember = (user) => {
      // memberList.value = memberList.value.filter(
      //   (member) => member.userId !== user.userId
      // );
      // memberIntList.value = memberIntList.value.filter((id) => id !== user.id);

      addmemberList.value = addmemberList.value.filter(
        (member) => member.userId !== user.userId
      );
      addmemberIntList.value = addmemberIntList.value.filter(
        (id) => id !== user.id
      );
    };

    // 그룹 생성하기
    const createGroup = async (groupInfo) => {
      console.log(groupInfo);
      // 내 정보를 추가해서 보내기
      addmemberIntList.value.push(authStore.user.id);

      // 요청 객체 생성 후 전송
      const requestMakegroup = {
        groupInfo: groupInfo,
        userList: addmemberIntList.value,
      };
      const response = await groupApi.post("", requestMakegroup, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      searchList.value = [];
      // memberList.value = [];
      // memberIntList.value = [];
      addmemberList.value = [];
      addmemberIntList.value = [];
    };

    const getGroupList = async () => {
      const response = await groupApi.get("/list", {
        params: {
          userId: authStore.user.id,
        },
      });
      groupList.value = response.data;

      for (const group of groupList.value) {
        const resp = await groupApi.get("/users", {
          params: {
            groupId: group.groupId,
          },
        });
        group.memberList = resp.data;
      }
    };

    const getMemberInfo = async (group) => {
      const response = await groupApi.get("/users", {
        params: {
          groupId: group.groupId,
        },
      });

      memberList.value = response.data.filter(
        (user) => user.id !== authStore.user.id
      );
      // memberIntList.value = memberList.value.map((member) => member.id);
    };

    const setCurGroup = async (group) => {
      const response = await groupApi.get("", {
        params: { groupId: group.groupId },
      });
      curgroup.value = response.data;
      getMemberInfo(curgroup.value);
      searchList.value = [];
    };

    const updateMember = async () => {
      const groupInfo = { groupId: curgroup.value.groupId };
      const obj = { groupInfo, userList: addmemberIntList.value };
      const response = await groupApi.put("/users", obj, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      addmemberList.value = [];
      addmemberIntList.value = [];
      getMemberInfo(curgroup.value);
    };

    const update = async (updateInfo) => {
      const response = await groupApi.put("", updateInfo, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      setCurGroup(updateInfo);
    };

    const setMusic = async (groupMusic) => {
      console.log("music: ", groupMusic);
      const obj = {
        groupId: curgroup.value.groupId,
        groupMusic,
      };
      const response = await groupApi.put("/music", obj, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      setCurGroup(curgroup.value);
    };

    const getAlarm = async () => {
      const response = await groupApi.get("/alarm", {
        params: {
          userId: authStore.user.id,
        },
      });
      alarmList.value = response.data;
    };

    const checkAlarm = async () => {
      const response = await groupApi.delete("/alarm", {
        params: {
          userId: authStore.user.id,
        },
      });
      alarmList.value = [];
    };

    return {
      searchList,
      memberList,
      addmemberList,
      addmemberIntList,
      groupList,
      curgroup,
      alarmList,
      findUser,
      addMember,
      removeMember,
      createGroup,
      getGroupList,
      setCurGroup,
      getMemberInfo,
      update,
      updateMember,
      setMusic,
      getAlarm,
      checkAlarm,
    };
  },
  { persist: { storage: sessionStorage } }
);
