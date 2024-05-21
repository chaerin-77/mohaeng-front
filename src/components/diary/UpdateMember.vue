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

// 멤버 수정 부분
import SearchMember from "../group/SearchMember.vue";
import MemberList from "../group/MemberList.vue";
import { useGroupStore } from "@/stores/group";
const groupStore = useGroupStore();

const updateMember = async () => {
  if (!confirm("이대로 수정하시겠습니까?")) return;
  try {
    await groupStore.updateMember();
    close();
  } catch (error) {
    console.error("에러:", error);
    alert("수정 실패");
  }
};
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
    <div class="absolute max-h-1/2 w-2/3">
      <div class="container bg-white rounded-md p-5">
        <div class="pb-4 mx-5 my-3 flex justify-between font-medium border-b">
          <p class="text-xl font-semibold text-gray-500">멤버 수정하기</p>
          <div
            @click="close"
            class="text-2xl hover:text-gray-600 cursor-pointer"
          >
            &#215;
          </div>
        </div>
        <div class="my-4">
          <div class="flex justify-between px-5">
            <div class="w-2/5">
              <p class="text-sm font-medium text-gray-900">멤버 검색</p>
              <SearchMember />
            </div>
            <div class="w-2/5">
              <p class="text-sm font-medium text-gray-900">현재 멤버</p>
              <MemberList />
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <button
            @click="updateMember"
            class="px-4 py-2 text-white bg-main-color rounded-md focus:outline-none hover:text-black"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
