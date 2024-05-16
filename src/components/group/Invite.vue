<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import InviteMember from "./InviteMember.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

// const userList = ref([]);
// const getUserList = async () => {
//   await authStore.getUserList();
//   userList.value = authStore.userList;
// };
// getUserList();

// const word = ref("");
// const filteredUsers = ref([]);
// const findUser = (event) => {
//   const searchWord = event.target.value.toLowerCase();
//   filteredUsers.value = userList.value.filter((user) =>
//     user.name.toLowerCase().includes(searchWord)
//   );
// };

const joinForm = ref({
  userId: "",
  userPwd: "",
  userName: "",
  userPhone: "",
  birthday: "",
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
  <form>
    <div class="flex p-5">
      <div class="w-96">
        <div class="mb-4">
          <label for="gname" class="block text-sm font-medium text-gray-900"
            >모임 명</label
          >
          <div class="mt-2">
            <input
              id="gname"
              name="gname"
              type="text"
              required
              class="block w-full border-b-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="gtitle" class="block text-sm font-medium text-gray-900"
            >모임 다이어리 제목</label
          >
          <div class="mt-2">
            <input
              id="gtitle"
              name="gtitle"
              type="text"
              required
              class="block w-full border-b-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:bg-blue-100"
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
              class="block w-full border-b-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
            <p>~</p>
            <input
              id="endDate"
              name="gdate"
              type="date"
              required
              class="block w-full border-b-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="gfile" class="block text-sm font-medium text-gray-900"
            >모임 이미지</label
          >
          <div class="mt-2">
            <input
              id="gfile"
              name="gfile"
              type="text"
              required
              class="block w-full border-b-2 pl-3 pr-3 border-main-color py-1.5 main-color placeholder:text-gray-400 focus:bg-blue-100"
            />
          </div>
        </div>
      </div>
      <div class="ml-32 w-full">
        <p class="text-sm font-medium text-gray-900">모임 멤버 초대하기</p>
        <!-- <InviteMember /> -->
        <div class="flex">
          <div class="mb-4 mt-2 w-1/2">
            <input
              id="gtitle"
              name="gtitle"
              type="text"
              s
              @input="findUser"
              @keyup.enter="findUser"
              v-model="word"
              required
              class="w-96 py-2.5 px-3 main-color placeholder:text-gray-400 bg-blue-100 rounded-md"
              placeholder="모임에 초대할 친구 아이디 혹은 이메일 검색"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
