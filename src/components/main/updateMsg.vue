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

// 메시지 등록 부분
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const content = ref("");

const addMsg = async () => {
  try {
    await authStore.addMsg(content.value);
    close();
  } catch (error) {
    console.error("에러:", error);
    alert("등록 실패");
  }
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
          <p class="text-xl font-semibold text-gray-500">
            프로필 텍스트 작성하기
          </p>
          <div
            @click="close"
            class="text-2xl hover:text-gray-600 cursor-pointer"
          >
            &#215;
          </div>
        </div>
        <div class="my-4">
          <div class="mt-2">
            <input
              type="text"
              v-model="content"
              required
              class="block w-96 h-52 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400"
            />
          </div>
        </div>
        <div class="text-center mt-5">
          <button
            @click="addMsg()"
            class="px-4 py-2 text-sm text-white bg-main-color rounded-md focus:outline-none hover:text-black"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
