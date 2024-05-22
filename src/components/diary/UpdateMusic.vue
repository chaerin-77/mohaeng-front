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
import { useGroupStore } from "@/stores/group";
const authStore = useAuthStore();
const groupStore = useGroupStore();
const diary = groupStore.curgroup;
const music = ref(groupStore.curgroup.groupMusic);
const setMusic = async () => {
  groupStore.setMusic(music.value);
  close();
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
    <div class="absolute max-h-full max-w-lg">
      <div class="container bg-white overflow-hidden rounded-md p-5">
        <div class="pb-4 flex justify-between font-medium border-b">
          <p class="text-xl font-semibold text-gray-500">
            프로필 뮤직 선택하기
          </p>
          <div
            @click="close"
            class="text-2xl hover:text-gray-600 cursor-pointer"
          >
            &#215;
          </div>
        </div>
        <div class="my-4">
          <div class="w-80 mb-4">
            <div class="mt-2">
              <select
                name="music"
                v-model="music"
                required
                class="block w-full rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <option value="A Year Ago.mp3">A Year Ago</option>
                <option value="Always Be My Unicorn.mp3">
                  Always Be My Unicorn
                </option>
                <option value="Bulbasound.mp3">Bulbasound</option>
                <option value="Good Days.mp3">Good Days</option>
                <option value="Handcrafted.mp3">Handcrafted</option>
                <option value="Night Run Away.mp3">Night Run Away</option>
                <option value="Reason_to_Stay_(feat._undy).mp3">
                  Reason_to_Stay_(feat._undy)
                </option>
                <option value="Serenity - Lish Grooves.mp3">
                  Serenity - Lish Grooves
                </option>
                <option value="So Sweet - Lish Grooves.mp3">
                  So Sweet - Lish Grooves
                </option>
                <option
                  value="Summer Solstice on the June Planet - Bail Bonds.mp3"
                >
                  Summer Solstice on the June Planet - Bail Bonds
                </option>
                <option value="Summer Somewhere In Cuba - Cumbia Deli.mp3">
                  Summer Somewhere In Cuba - Cumbia Deli
                </option>
                <option value="The Rainy Road - Lish Grooves.mp3">
                  The Rainy Road - Lish Grooves
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <button
            @click="setMusic"
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
