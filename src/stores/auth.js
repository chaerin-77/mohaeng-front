import { ref } from "vue";
import { defineStore } from "pinia";
import authApi from "@/api/authApi";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref(null);
    const user = ref(null);
    const userList = ref([]);

    const join = async (joinInfo) => {
      const response = await authApi.post("/join", joinInfo);

      //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
      token.value = response.data;
      await setUserInfo();
    };

    const login = async (loginInfo) => {
      const response = await authApi.post("/login", loginInfo);

      //토큰 정보 및 유저 정보 세팅
      token.value = response.data;
      await setUserInfo();
    };

    const logout = () => {
      //토큰 정보 및 유저 정보 삭제
      token.value = null;
      user.value = null;
    };

    const setUserInfo = async () => {
      const response = await authApi.get("/userInfo", {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      user.value = response.data;
    };

    // 전체 유저 조회
    const getUserList = async () => {
      const response = await authApi.get("/search");
      userList = response.data;
    };

    return { user, token, userList, getUserList, join, login, logout };
  },
  { persist: { storage: sessionStorage } }
);
