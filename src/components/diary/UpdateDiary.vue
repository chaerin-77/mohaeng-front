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

// 공지 등록 부분
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const diary = ref({
  groupId: "",
  groupName: "",
  groupTitle: "",
  groupImg: "",
  startDate: "",
  endDate: "",
});

// const join = async () => {
//   if (!confirm("이대로 가입하시겠습니까?")) return;
//   try {
//     await authStore.join(notice.value);
//     router.push("/");
//   } catch (error) {
//     console.error("에러:", error);
//     alert("가입 실패");
//   }
// };
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50"
      @click="close"
    ></div>
    <div class="absolute max-h-full max-w-lg">
      <div class="container bg-white overflow-hidden rounded-md p-5">
        <div class="pb-4 flex justify-between font-medium border-b">
          <p class="text-xl font-semibold text-gray-500">다이어리 수정하기</p>
          <div
            @click="close"
            class="text-2xl hover:text-gray-600 cursor-pointer"
          >
            &#215;
          </div>
        </div>
        <div class="my-4">
          <div class="w-80 mb-4">
            <label for="email" class="block text-sm font-medium text-gray-900"
              >모임 명</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model.trim="diary.groupName"
                required
                class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div class="w-80 mb-4">
            <label for="email" class="block text-sm font-medium text-gray-900"
              >모임 다이어리 제목</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model.trim="diary.groupName"
                required
                class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="gdate" class="block text-sm font-medium text-gray-900"
              >모임 날짜</label
            >
            <div class="mt-2 flex">
              <input
                id="startDate"
                name="gdate"
                type="date"
                required
                class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
              />
              <p>~</p>
              <input
                id="endDate"
                name="gdate"
                type="date"
                required
                class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
              />
            </div>
          </div>
          <div class="w-80 mb-4">
            <label for="email" class="block text-sm font-medium text-gray-900"
              >모임 이미지</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model.trim="diary.groupImg"
                required
                class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <button
            @click="close"
            class="px-4 py-2 text-sm text-white bg-main-color rounded-md focus:outline-none hover:text-black"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>