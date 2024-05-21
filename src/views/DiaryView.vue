<script setup>
import { ref, computed } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";
import UpdateDiary from "@/components/diary/UpdateDiary.vue";
import UpdateMember from "@/components/diary/UpdateMember.vue";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";

const route = useRoute();

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const groupStore = useGroupStore();
const groupList = computed(() => groupStore.groupList);
const group = computed(() => groupStore.curgroup);
groupStore.getMemberInfo(groupStore.curgroup);

const showModal1 = ref(false);
const showModal2 = ref(false);
</script>

<template>
  <div class="container pt-14">
    <div class="flex">
      <!--왼쪽 사이드 바-->
      <div class="text-center w-56 mt-2">
        <div class="mb-10">
          <span class="text-gray-500">TODAY </span>
          <span class="text-red-500"> {{ group.todayCnt }} </span>
          <span class="text-gray-500"> | TOTAL </span>
          <span class="text-gray-500"> {{ group.totalCnt }}</span>
        </div>
        <!-- 왼쪽 상단 내 프로필 -->
        <div
          class="bg-main-color p-4 text-center rounded-xl grid place-items-center mb-5 w-52"
        >
          <div class="bg-gray-500 h-40 w-32"></div>
          <p class="text-white mt-4 text-lg">{{ user.userName }}</p>
          <p class="text-white mt-4 text-md font-light">{{ user.message }}</p>
          <div class="mt-20">
            <p class="text-white mb-3">다른 모임</p>
            <div class="flex flex-wrap w-full gap-x-2 gap-y-2">
              <div
                v-for="othergroup in groupList"
                :key="othergroup.groupId"
                class="rounded-full border-2 border-white w-12 h-12"
              ></div>
              <RouterLink :to="{ name: 'invite' }"
                ><div
                  class="hover:shadow-xl rounded-full bg-orange-300 w-12 h-12 pt-2.5"
                >
                  <font-awesome-icon
                    icon="plus"
                    style="color: white"
                    size="xl"
                  /></div
              ></RouterLink>
            </div>
          </div>
        </div>
        <!-- 멤버 div -->
        <div class="bg-main-color py-4 px-4 rounded-xl text-left">
          <div class="flex justify-between">
            <p class="text-white text-lg mb-4">모임 멤버</p>
            <a
              href="#"
              @click="showModal2 = true"
              class="text-white underline text-sm mt-1"
              >수정</a
            >
          </div>
          <!-- member list -->
          <div v-for="member in groupStore.curgroupInfo" class="flex mb-2">
            <div
              class="rounded-full border-2 border-white w-12 h-12 mr-2"
            ></div>
            <p class="text-white m-2 text-md">{{ member.userName }}</p>
          </div>
        </div>
      </div>
      <!-- 가운데 다이어리 -->
      <div class="ml-10 w-full">
        <div class="flex justify-between mb-10">
          <!-- title 부분 -->
          <div class="mr-5">
            <span class="text-2xl font-semibold">{{ group.groupTitle }} </span>
            <span class="text-xl font-medium text-gray-500 ml-5">{{
              group.groupName
            }}</span>
          </div>
          <!-- 날짜 부분 -->
          <div class="flex mr-3">
            <div class="text-xl font-medium text-gray-500 mr-5">
              <span>{{ group.startDate }} ~ {{ group.endDate }}</span>
            </div>
            <a href="#" @click="showModal1 = true">
              <font-awesome-icon
                icon="pen-to-square"
                class="text-main-color hover:text-orange-300 h-5 mt-1"
              />
            </a>
          </div>
        </div>
        <!-- 다이어리 내용 -->
        <div class="border-2 border-main-color p-5 rounded-xl grid">
          <router-view></router-view>
        </div>
      </div>
      <!-- 오른쪽 navbar -->
      <div class="mt-20">
        <router-link
          :to="{ name: 'diaryHome' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <div
            class="w-24 border-2 border-l-0 border-main-color grid place-items-center mb-2 pt-2 pb-2"
            :class="{ 'bg-main-color': route.name === 'diaryHome' }"
          >
            <p
              class="text-main-color"
              :class="{ 'text-white': route.name === 'diaryHome' }"
            >
              HOME
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'diaryPlan' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <div
            class="w-24 border-2 border-l-0 border-main-color grid place-items-center mb-2 pt-2 pb-2"
            :class="{ 'bg-main-color': route.name === 'diaryPlan' }"
          >
            <p
              class="text-main-color"
              :class="{ 'text-white': route.name === 'diaryPlan' }"
            >
              PLAN
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'diaryMemory' }"
          class="hover:no-underline hover:text-blue-800"
        >
          <div
            class="w-24 border-2 border-l-0 border-main-color grid place-items-center pt-2 pb-2"
            :class="{
              'bg-main-color':
                route.name === 'diaryMemory' || route.name === 'addMemory',
            }"
          >
            <p
              class="text-main-color"
              :class="{
                'text-white':
                  route.name === 'diaryMemory' || route.name === 'addMemory',
              }"
            >
              MEMORY
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <UpdateDiary v-model="showModal1" />
  <UpdateMember v-model="showModal2" />
</template>

<style scoped></style>
