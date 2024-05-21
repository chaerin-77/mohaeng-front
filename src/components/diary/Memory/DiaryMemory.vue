<script setup>
import { ref } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";
import memoryApi from "@/api/memoryApi";
import { useGroupStore } from "@/stores/group";

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
  groupStore.curgroupInfo.forEach((member) => {
    userIdToName[member.id] = member.userName;
  });
  
  memoryList.value = memoryList.value.map((memory) => {
    const userName = userIdToName[memory.userId];
    
    return { ...memory, userName };
  });
};
loading();
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
        <div class="flex place-items-center">
          <div class="bg-gray-500 w-10 h-12"></div>
          <div class="ml-3">
            <p class="font-semibold">{{ item.userName }}</p>
            <p class="text-gray-500">{{ item.writeTime }}</p>
          </div>
        </div>
        <hr class="my-4" />
        <div class="text-center grid place-items-center">
          <div height="500px"><img height="100px" :src="item.img" /></div>
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
