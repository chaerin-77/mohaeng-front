<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;

const imgList = ref([
  {
    select: false,
    value: "/src/assets/profile/free-icon-bird-1067920.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-blogger-3983265.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-boy-1149922.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-boy-2945467.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-carrot-1391334.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-man-2233922.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-mouse-1067929.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-obesity-3136113.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-old-man-3544946.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-old-woman-2902101.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-shark-1841101.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-student-1046374.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-student-4472533.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-tourist-15773500.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-woman-2423916.png",
  },
  {
    select: false,
    value: "/src/assets/profile/free-icon-young-15370950.png",
  },
]);

const selectImg = ref(1);
const clickEvent = (idx) => {
  console.log(idx, " : ", imgList.value[idx]);
  imgList.value[selectImg.value].select = false;
  imgList.value[idx].select = true;
  selectImg.value = idx;
  updateForm.value.img = imgList.value[selectImg.value].value;
};

const updateForm = ref({
  id: user.id,
  userId: user.userId,
  userName: user.userName,
  userPhone: user.userPhone,
  birthday: user.birthday,
  img: user.img,
});

const update = async () => {
  console.log("img.. ", updateForm.value.img);
  if (!confirm("이대로 수정하시겠습니까?")) return;
  try {
    await authStore.update(updateForm.value);
    router.push("/");
  } catch (error) {
    console.error("에러:", error);
    alert("수정 실패");
  }
};
</script>

<template>
  <div>
    <p class="text-gray-500 text-xl font-semibold mb-3">내 정보 수정하기</p>
  </div>
  <div class="grid gap-x-6 gap-y-8">
    <form @submit.prevent="update">
      <div class="flex justify-evenly">
        <div class="mt-20 mr-5">
          <div class="mb-4 flex place-items-center">
            <label
              for="email"
              class="block text-sm font-medium text-gray-900 mr-5"
              >아이디</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model.trim="updateForm.userId"
                readonly
                class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div class="mb-4 flex place-items-center">
            <label
              for="name"
              class="mr-5 block text-sm font-medium text-gray-900"
              >이름</label
            >
            <div class="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                v-model.trim="updateForm.userName"
                required
                class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div class="mb-4 flex place-items-center">
            <label
              for="phone"
              class="mr-5 block text-sm font-medium text-gray-900"
              >전화번호</label
            >
            <div class="mt-2">
              <input
                id="phone"
                name="phone"
                type="phone"
                v-model.trim="updateForm.userPhone"
                required
                class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div class="mb-4 flex place-items-center">
            <label
              for="birthday"
              class="mr-5 block text-sm font-medium text-gray-900"
              >생년월일</label
            >
            <div class="mt-2">
              <input
                id="birthday"
                name="birthday"
                type="date"
                v-model.trim="updateForm.birthday"
                required
                class="block w-96 rounded-md border-2 pl-3 pr-3 border-main-color py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>
        <div class="mt-10">
          <div class="w-80 mb-4">
            <p class="block text-sm font-medium text-gray-900 mb-2">
              아바타 설정하기
            </p>
            <div class="flex flex-wrap">
              <div
                v-for="(image, idx) in imgList"
                :key="idx"
                class="m-1 border-2"
                :class="{
                  'border-main-color': image.select,
                }"
              >
                <img
                  :src="`${image.value}`"
                  width="65px"
                  @click="clickEvent(idx)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-20 flex items-center justify-center gap-x-6">
        <input
          type="submit"
          class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
          value="수정하기"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
