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
                <option value="Bulbasound_-_Meditation.mp3">
                  Bulbasound_-_Meditation.mp3
                </option>
                <option value="Carlos_Estella_-_Epic_Uplifting_Inspiration.mp3">
                  Carlos_Estella_-_Epic_Uplifting_Inspiration
                </option>
                <option
                  value="OnClassical_-_alessandro_deljavan_bach_little_preludes_and_wtc_alternative_versions_01_clavier_buechlein_vor_wh._f._bach_no._1_applicatio_bwv_.mp3"
                >
                  OnClassical_-_alessandro_deljavan_bach_little_preludes_and_wtc_alternative_versions_01_clavier_buechlein_vor_wh._f._bach_no._1_applicatio_bwv_
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

<style scoped>
/* 움직이는 텍스트 */
.animated-title {
  font-size: 60px;
  font-family: "Raleway", Sans-serif;
  font-weight: 300;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding: 100px 0;
  overflow-x: hidden;
  overflow-y: hidden;
}
.animated-title .track {
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 60s linear infinite;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (hover: hover) and (min-width: 700px) {
  .animated-title .content {
    -webkit-transform: translateY(calc(100% - 8rem));
    transform: translateY(calc(100% - 8rem));
  }
}
</style>
