<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import memoryApi from "@/api/memoryApi";
const router = useRouter();
const back = () => {
  router.go(-1);
};

import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
const authStore = useAuthStore();
const groupStore = useGroupStore();
const user = authStore.user;
const group = groupStore.curgroup;

const memoryForm = ref({
  img: "",
  content: "",
  groupId: group.groupId,
  userId: user.id,
});

const uploadImg = async () => {
  const formData = new FormData();
  let file = document.getElementById("upload").files[0];
  console.log(file);
  if (file != null) {
    formData.append("image", file);
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=" +
        "02e43c8ec4af37cb23733f977ea04dca",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      memoryForm.value.img = data.data.url;
    }
  }

  setMemory();
  const targetRoute = router.resolve({ name: "diaryMemory" });
  window.location.href = targetRoute.href; // 페이지 새로고침 포함 이동
};

const setMemory = async () => {
  const response = await memoryApi.post("", memoryForm.value, {
    headers: { Authorization: `Bearer ${authStore.token}` },
  });
};
</script>

<template>
  <div class="px-5 grid place-items-center">
    <p class="text-xl font-semibold mb-4 text-center">추억 작성하기</p>
    <div class="border border-main-color w-full p-5 mb-5">
      <form action="" method="" enctype="multipart/form-data">
        <div class="img_wrap">
          <img id="img" />
        </div>
        <div class="mb-3">
          <textarea
            class="w-full h-64 overflow-y-scroll"
            v-model="memoryForm.content"
          ></textarea>
        </div>
        <hr class="my-4" />
        <input type="file" accept="image/*" id="upload" />
      </form>
    </div>
    <div class="flex gap-x-5">
      <button
        @click="back"
        class="px-4 py-2 text-sm text-main-color border-2 border-main-color rounded-md focus:outline-none hover:bg-gray-300"
      >
        취소하기
      </button>
      <button
        class="px-4 py-2 text-sm text-white bg-main-color rounded-md focus:outline-none hover:bg-gray-300"
        @click="uploadImg"
      >
        등록하기
      </button>
    </div>
  </div>
</template>

<style scoped></style>
