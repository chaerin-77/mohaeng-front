<script setup>
import { debounce } from "lodash";
import { ref } from "vue";
import { useGroupStore } from "@/stores/group";

const groupStore = useGroupStore();
const { addMember } = groupStore;
const word = ref("");

const findUser = debounce(() => {
  if (word.value.length > 0) {
    groupStore.findUser(word.value);
  }
}, 500);
</script>

<template>
  <div class="">
    <p class="text-sm font-medium text-gray-900">모임 멤버 초대하기</p>
    <div class="mb-4 mt-2 w-full">
      <div class="flex mb-2 justify-between">
        <input
          id="gtitle"
          name="gtitle"
          type="text"
          @input="findUser"
          @keyup.enter="findUser"
          v-model="word"
          class="block w-80 py-2.5 px-3 main-color placeholder:text-gray-400 bg-blue-100 border-b-2 border-x-0 border-t-0 border-main-color"
          placeholder="모임에 초대할 친구 아이디 혹은 이메일 검색"
        />
        <button
          @click.prevent="findUser"
          class="px-4 text-sm text-white bg-main-color rounded-md focus:outline-none hover:text-black"
        >
          검색
        </button>
      </div>
      <div v-for="user in groupStore.userList" :key="user.id">
        <div class="mt-1 py-3 bg-gray-100 flex justify-evenly">
          <p>{{ user.userName }}</p>
          <p>{{ user.userId }}</p>
          <font-awesome-icon
            icon="plus"
            class="mt-1 text-main-color"
            @click="addMember(user.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
