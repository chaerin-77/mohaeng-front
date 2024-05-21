import { ref } from "vue";
import { defineStore } from "pinia";
import authApi from "@/api/authApi";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref(null);
    const user = ref(null);

    const join = async (joinInfo) => {
      const response = await authApi.post("/join", joinInfo);

      //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
      let localToken = response.data;
      token.value = localToken;

      let localUser = await setUserInfo();
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: localUser,
          token: localToken,
        })
      );
      user.value = localUser;
    };

    const login = async (loginInfo) => {
      const response = await authApi.post("/login", loginInfo);

      //토큰 정보 및 유저 정보 세팅
      let localToken = response.data;
      token.value = localToken;

      let localUser = await setUserInfo();
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: localUser,
          token: localToken,
        })
      );

      user.value = localUser;
    };

    const logout = () => {
      //토큰 정보 및 유저 정보 삭제
      token.value = null;
      user.value = null;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: "",
          token: "",
        })
      );
    };

    const setUserInfo = async () => {
      const response = await authApi.get("/userInfo", {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return response.data;
    };

    const update = async (updateInfo) => {
      const response = await authApi.put("/update", updateInfo, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      await setUserInfo();
    };

    const updatePwd = async (pwdInfo) => {
      const response = await authApi.put("/pwd", pwdInfo, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      await setUserInfo();
    };

    const addMsg = async (content) => {
      const obj = { id: user.id, message: content };
      const response = await authApi.put("/msg", obj, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      await setUserInfo();
    };

    return { user, token, join, login, logout, update, updatePwd, addMsg };
  },
  { persist: { storage: localStorage } }
);
