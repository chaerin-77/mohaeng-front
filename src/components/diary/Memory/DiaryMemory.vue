<script setup>
import { ref } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";
import memoryApi from "@/api/memoryApi";
import { useGroupStore } from "@/stores/group";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const groupStore = useGroupStore();
const group = groupStore.curgroup;
const memoryList = ref([]);
const loading = async () => {
  const response = await memoryApi.get("", {
    params: {
      groupId: group.groupId,
    },
  });

  memoryList.value = response.data;
  getMemberName();
};

const getMemberName = () => {
  const userIdToName = {};
  const userIdToImg = {};
  groupStore.curgroupInfo.forEach((member) => {
    userIdToName[member.id] = member.userName;
    userIdToImg[member.id] = member.img;
  });

  memoryList.value = memoryList.value.map((memory) => {
    const userName = userIdToName[memory.userId];
    const userImg = userIdToImg[memory.userId];

    return { ...memory, userName, userImg };
  });
};
loading();

const deleteMemory = async (memoryId) => {
  const response = await memoryApi.delete(
    "",
    {
      params: {
        memoryId,
      },
    },
    {
      headers: { Authorization: `Bearer ${authStore.token}` },
    }
  );
  window.location.reload(true);
};
</script>

<template>
  <div>
    <div class="flex mb-4 justify-between">
      <p class="text-xl font-semibold">우리만의 추억들</p>
      <RouterLink :to="{ name: 'addMemory' }" class="hover:text-orange-300">
        <span class="text-main-color hover:text-orange-300 mr-2 underline"
          >추억 작성하기</span
        >
      </RouterLink>
    </div>
    <div class="gap-y-5">
      <div v-for="item in memoryList" class="bg-gray-100 p-4 mx-5 mb-3">
        <div class="flex justify-between">
          <div class="flex">
            <div
              class="w-10 h-12"
              :style="`background-image: url(${item.userImg}); background-size: cover; background-position: center;`"
            ></div>
            <div class="ml-3">
              <p v-if="item.userId === authStore.user.id" class="font-semibold">
                {{ authStore.user.userName }}
              </p>
              <p v-else class="font-semibold">{{ item.userName }}</p>
              <p class="text-gray-500">{{ item.writeTime }}</p>
            </div>
          </div>
          <font-awesome-icon
            v-if="item.userId === authStore.user.id"
            icon="fa-regular fa-trash-can"
            class="text-red-400 w-5 h-5 mt-1 hover:text-gray-400"
            @click="deleteMemory(item.memoryId)"
          />
        </div>
        <hr class="my-4" />
        <div class="text-center grid place-items-center gap-y-5">
          <div><img width="400px" :src="item.img" /></div>
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
