<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
import updateMsg from "@/components/main/updateMsg.vue";
import MyDiary from "@/components/main/MyDiary.vue";

const showModal = ref(false);

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const groupStore = useGroupStore();
const groupList = computed(() => groupStore.groupList);
</script>

<template>
  <div class="bg-main-color p-20">
    <div class="container flex justify-between">
      <div class="w-3/5">
        <h1 class="text-white text-xl font-semibold mb-6">내 프로필</h1>
        <div class="bg-white rounded-2xl p-5 flex justify-between">
          <div
            class="h-28 w-28"
            :style="`background-image: url(${authStore.user.img}); background-size: cover; background-position: center;`"
          ></div>
          <div class="w-2/3">
            <p class="font-semibold text-lg text-gray-600">
              {{ user.userName }}
            </p>
            <p class="text-md text-gray-600 mt-2">{{ user.birthday }}</p>
            <div class="flex mt-3 justify-between w-full">
              <p class="text-md text-gray-600">{{ user.message }}</p>
              <font-awesome-icon
                icon="pencil"
                @click="showModal = true"
                class="hover:text-main-color"
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-500 p-4 text-center rounded-xl">
          <RouterLink :to="{ name: 'myinfo' }" class="hover: no-underline"
            ><p class="text-white">내 정보 수정하기 ></p></RouterLink
          >
        </div>
      </div>
      <div class="ml-10 w-full">
        <h1 class="text-white text-xl font-semibold mb-6">내 여행 모임</h1>
        <div class="flex p-5 border-2 border-white rounded-2xl flex-wrap">
          <div
            v-for="group in groupList"
            :key="group.groupId"
            class="text-center mr-3"
          >
            <div
              class="rounded-full border-2 border-white w-20 h-20"
              :style="`background-image: url(${group.groupImg}); background-size: cover; background-position: center;`"
            ></div>
            <p class="text-white text-md mt-3">{{ group.groupName }}</p>
          </div>
          <div class="text-center">
            <RouterLink :to="{ name: 'invite' }">
              <div
                class="hover:shadow-xl rounded-full bg-orange-300 w-20 h-20 pt-4"
              >
                <font-awesome-icon
                  icon="plus"
                  style="color: white"
                  size="2xl"
                />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container pt-20">
    <p class="text-gray-500 text-xl font-semibold mb-5">나의 다이어리</p>
    <div class="flex justify-between flex-wrap gap-y-5">
      <MyDiary
        v-for="group in groupList"
        :key="group.groupId"
        :group="group"
        class="w-4/9"
      />
    </div>
  </div>
  <updateMsg v-model="showModal" />
</template>

<style scoped></style>
