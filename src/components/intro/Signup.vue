<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import authApi from "@/api/authApi";
const authStore = useAuthStore();
const router = useRouter();

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

const selectImg = ref(0);
const clickEvent = (idx) => {
  imgList.value[selectImg.value].select = false;
  imgList.value[idx].select = true;
  selectImg.value = idx;
  joinForm.value.img = imgList.value[selectImg.value].value;
};

/* 아이디 중복 체크 */
const email = ref("");
const emailDuplication = ref(true);
const checkId = async () => {
  await authApi
    .get("/checkid", {
      params: {
        inputId: email.value,
      },
    })
    .then((res) => {
      res.data;
      emailDuplication.value = true;
    })
    .catch((err) => {
      emailDuplication.value = false;
    });
};

/* 비밀번호 일치 여부 체크 */
const password = ref("");
const confirmPassword = ref("");
const passwordMatch = ref(true);

const checkPasswordMatch = () => {
  passwordMatch.value = password.value === confirmPassword.value;
};

const joinForm = ref({
  userId: email,
  userPwd: password,
  userName: "",
  userPhone: "",
  birthday: "",
  img: "",
});

const join = async () => {
  if (!confirm("이대로 가입하시겠습니까?")) return;
  try {
    await authStore.join(joinForm.value);
    router.push("/");
  } catch (error) {
    console.error("에러:", error);
    alert("가입 실패");
  }
};
</script>

<template>
  <div class="absolute pt-24 pb-24 pl-36 pr-36 bg-white shadow-md">
    <div class="grid place-items-center">
      <img src="/src/assets/logo-text.png" alt="" class="block w-30" />
      <div class="grid gap-x-6 gap-y-8">
        <form @submit.prevent="join">
          <div class="flex">
            <div class="mt-10 mr-5">
              <div class="w-80 mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-900"
                  >아이디</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    v-model.trim="email"
                    @blur="checkId"
                    @keyup.enter="checkId"
                    required
                    class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
                  />
                </div>
                <!-- 아이디 중복 여부를 표시하는 메시지 -->
                <p v-if="!emailDuplication" class="text-red-500 text-xs mt-1">
                  사용할 수 없는 아이디입니다.
                </p>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-900"
                  >비밀번호</label
                >
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="password"
                    required
                    @input="checkPasswordMatch"
                    class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="ckpassword"
                  class="block text-sm font-medium text-gray-900"
                  >비밀번호 확인</label
                >
                <div class="mt-2">
                  <input
                    id="ckpassword"
                    name="ckpassword"
                    type="password"
                    v-model="confirmPassword"
                    @input="checkPasswordMatch"
                    class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
                  />
                </div>
                <!-- 비밀번호 일치 여부를 표시하는 메시지 -->
                <p v-if="!passwordMatch" class="text-red-500 text-xs mt-1">
                  비밀번호가 일치하지 않습니다.
                </p>
              </div>
            </div>
            <div class="mt-10 mr-5">
              <div class="w-80 mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-900"
                  >이름</label
                >
                <div class="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    v-model.trim="joinForm.userName"
                    required
                    class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-900"
                  >전화번호</label
                >
                <div class="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    v-model.trim="joinForm.userPhone"
                    required
                    class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
                  />
                </div>
              </div>
              <div class="w-80 mb-4">
                <label
                  for="birthday"
                  class="block text-sm font-medium text-gray-900"
                  >생년월일</label
                >
                <div class="mt-2">
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    v-model.trim="joinForm.birthday"
                    required
                    class="block w-full border-t-0 border-l-0 border-r-0 border-b-2 px-3 py-2 border-main-color main-color placeholder:text-gray-400 focus:bg-blue-100"
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
          <div class="mt-14 flex items-center justify-center gap-x-6">
            <input
              type="submit"
              class="rounded-xl bg-main-color px-12 py-3 text-md font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
              value="회원가입"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
