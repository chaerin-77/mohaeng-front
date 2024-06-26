<script setup>
import { ref, computed } from "vue";
import { RouterView, RouterLink, useRoute, useRouter } from "vue-router";
import UpdateDiary from "@/components/diary/UpdateDiary.vue";
import UpdateMember from "@/components/diary/UpdateMember.vue";
import UpdateMusic from "@/components/diary/UpdateMusic.vue";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
import groupApi from "@/api/groupApi";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const groupStore = useGroupStore();
const groupList = computed(() => groupStore.groupList);
const group = computed(() => groupStore.curgroup);
groupStore.getMemberInfo(groupStore.curgroup);
const removeMember = async (member) => {
  if (!confirm("삭제하시겠습니까?")) return;
  groupStore.removeMember(member);
  const response = await groupApi.delete("/users", {
    params: {
      groupId: groupStore.curgroup.groupId,
      userId: member.id,
    },
    headers: { Authorization: `Bearer ${authStore.token}` },
  });
  groupStore.getMemberInfo(groupStore.curgroup);
};

// 오디오 요소에 대한 ref
const audioElement = ref(null);

// 오디오를 재생하는 함수
const playAudio = () => {
  if (audioElement.value) {
    audioElement.value.play();
  }
};

// 오디오를 일시 정지하는 함수
const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
};

const setting = async (group) => {
  await groupStore.setCurGroup(group);
  window.location.reload(true);
};

const showModal1 = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
</script>

<template>
  <div class="container py-14">
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
          class="bg-white border border-gray-200 rounded-md flex justify-between p-1 mb-3"
        >
          <img src="/src/assets/playcd.gif" alt="" width="25px" height="20px" />
          <a
            href="#"
            class="hover:no-underline hover:text-main-color w-1/2 mx-2"
            @click.prevent="showModal3 = true"
          >
            <marquee direction="left" scrollamount="3" class="text-sm">{{
              groupStore.curgroup.groupMusic
            }}</marquee>
          </a>
          <div>
            <font-awesome-icon
              icon="play"
              class="hover:text-orange-300 h-4 mt-1 mr-2"
              @click="playAudio"
            />
            <font-awesome-icon
              icon="pause"
              class="hover:text-orange-300 h-4 mt-1 mr-1"
              @click="pauseAudio"
            />
          </div>
        </div>
        <audio
          ref="audioElement"
          loop
          autoplay
          preload="auto"
          :src="`/src/assets/musics/${groupStore.curgroup.groupMusic}`"
        ></audio>
        <div
          class="bg-main-color p-4 text-center rounded-xl grid place-items-center mb-5 w-52"
        >
          <div
            class="bg-white h-32 w-32"
            :style="`background-image: url(${user.img}); background-size: cover; background-position: center;`"
          ></div>
          <p class="text-white mt-4 text-lg">{{ user.userName }}</p>
          <p class="text-white mt-4 text-md font-light">{{ user.message }}</p>
          <div class="mt-20">
            <p class="text-white mb-3">다른 모임</p>
            <div class="flex flex-wrap w-full gap-x-2 gap-y-2">
              <div
                v-for="othergroup in groupList"
                :key="othergroup.groupId"
                class="rounded-full border-2 border-white w-12 h-12"
                :style="`background-image: url(${othergroup.groupImg}); background-size: cover; background-position: center;`"
                @click="setting(othergroup)"
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
              >추가</a
            >
          </div>
          <!-- member list -->
          <div
            v-for="member in groupStore.memberList"
            class="flex mb-2 justify-between"
          >
            <div class="flex">
              <div
                class="rounded-full border-2 border-white w-12 h-12 mr-2"
                :style="`background-image: url(${member.img}); background-size: cover; background-position: center;`"
              ></div>
              <p class="text-white m-2 text-md">{{ member.userName }}</p>
            </div>
            <a href="#">
              <font-awesome-icon
                icon="circle-minus"
                class="text-white hover:text-orange-300 h-4 mt-2"
                @click="removeMember(member)"
              />
            </a>
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
        <div class="border-2 border-main-color p-5 rounded-xl">
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
  <UpdateMusic v-model="showModal3" />
  <div
    class="absolute z-10 rounded-full w-[4rem] h-5 bg-white border-2 border-main-color left-[24.5rem] top-[21rem]"
  ></div>
  <div
    class="absolute z-10 rounded-full w-[4rem] h-5 bg-white border-2 border-main-color left-[24.5rem] top-[29rem]"
  ></div>
  <div
    class="absolute z-10 rounded-full w-[4rem] h-5 bg-white border-2 border-main-color left-[24.5rem] top-[37rem]"
  ></div>
</template>

<style scoped></style>
