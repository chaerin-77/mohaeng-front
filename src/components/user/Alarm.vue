<script setup>
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  defineProps,
  defineEmits,
} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const close = () => {
  isOpen.value = false;
  emit("update:modelValue", false);
};

onMounted(() => {
  const onEscape = (e) => {
    if (e.key === "Esc" || e.key === "Escape") {
      close();
    }
  };

  document.addEventListener("keydown", onEscape);

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", onEscape);
  });
});

import { useGroupStore } from "@/stores/group";
const groupStore = useGroupStore();
const checkAlarm = async () => {
  await groupStore.checkAlarm();
  close();
};
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-20"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50"
      @click="close"
    ></div>
    <div class="absolute max-h-full max-w-lg">
      <div class="container bg-white overflow-hidden rounded-md p-5">
        <div class="pb-4 flex justify-between font-medium border-b">
          <p class="text-xl font-semibold text-gray-500">알림</p>
          <div
            @click="checkAlarm"
            class="text-2xl hover:text-gray-600 cursor-pointer"
          >
            &#215;
          </div>
        </div>
        <div class="my-4">
          <div
            v-for="group in groupStore.alarmList"
            :key="group.groupId"
            class="flex text-gray-500 px-12 py-4 hover:bg-blue-100"
          >
            <font-awesome-icon
              icon="fa-regular fa-bell"
              class="w-6 h-6 mr-10"
            />
            <div class="text-center">
              <p>새로운 모임에 초대되었어요!</p>
              <p>모임 명: {{ group.groupName }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <button
            @click="checkAlarm"
            class="px-4 py-2 text-sm text-white bg-main-color rounded-md focus:outline-none hover:text-black"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
