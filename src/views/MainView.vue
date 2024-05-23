<script setup>
import { ref, computed, onMounted } from "vue";
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
console.log(groupList);

const typedText = ref("");
const txt = "<모>여서 여<행>?\n<모>이면 <행>복!";
let i = 0;

const viewText = () => {
  if (i < txt.length) {
    if (txt.charAt(i) === "\n") {
      typedText.value += "<br>";
    } else if (txt.charAt(i) === "<") {
      typedText.value += "<span class='text-orange-300'>";
    } else if (txt.charAt(i) === ">") {
      typedText.value += "</span>";
    } else {
      typedText.value += txt.charAt(i);
    }
    i++;
    setTimeout(viewText, 150);
  }
};

onMounted(() => {
  viewText();
});
</script>

<template>
  <div
    style="
      background-image: url('/src/assets/background.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div class="bg-black bg-opacity-30 py-20">
      <div class="container flex justify-between px-36">
        <p
          v-html="typedText"
          class="text-white text-8xl p-5 font-[harubang] mt-4"
          style="
            line-height: 130%;
            text-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
          "
        ></p>
        <div class="w-2/5 bg-white shadow-lg border rounded-2xl p-5">
          <div class="flex justify-between">
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
          <hr class="mt-4" />
          <div class="w-full mt-4">
            <h1 class="text-gray-600 text-lg font-semibold mb-3">
              내 여행 모임
            </h1>
            <div class="flex p-2 border-2 border-white rounded-2xl flex-wrap">
              <div
                v-for="group in groupList"
                :key="group.groupId"
                class="text-center mr-3"
              >
                <div
                  class="rounded-full border-2 border-gray-600 w-14 h-14"
                  :style="`background-image: url(${group.groupImg}); background-size: cover; background-position: center;`"
                ></div>
                <p class="text-gray-600 text-md mt-3">{{ group.groupName }}</p>
              </div>
              <div class="text-center">
                <RouterLink :to="{ name: 'invite' }">
                  <div
                    class="hover:shadow-xl rounded-full bg-orange-300 w-14 h-14 pt-3"
                  >
                    <font-awesome-icon
                      icon="plus"
                      style="color: white"
                      size="xl"
                    />
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container pt-20">
    <p class="text-gray-500 text-xl font-semibold mb-5">나의 다이어리</p>
    <div class="flex justify-between flex-wrap gap-y-5">
      <div
        v-if="groupList.length < 1"
        class="w-full mb-4 py-5 border border-gray-500 rounded-xl shadow-md text-center grid place-items-center"
      >
        <p class="text-lg">아직 모임이 없어요!</p>
        <p class="mb-4 text-lg">모임을 만들어보세요</p>
        <RouterLink :to="{ name: 'invite' }">
          <div
            class="hover:shadow-xl rounded-full bg-orange-300 w-20 h-20 pt-4"
          >
            <font-awesome-icon icon="plus" style="color: white" size="2xl" />
          </div>
        </RouterLink>
      </div>
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
