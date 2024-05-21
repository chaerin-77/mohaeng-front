import { ref, computed } from "vue";
import { defineStore } from "pinia";
import attractionApi from "@/api/attractionApi";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";
import dayjs from "dayjs";

export const useAttractionStore = defineStore(
  "attraction",
  () => {
    const groupStore = useGroupStore();
    const authStore = useAuthStore();
    const sidoList = ref([]);
    const typeList = ref([]);
    const searchList = ref([]);
    const planList = ref([]);

    // 시작 날짜와 종료 날짜 사이의 날짜 배열을 계산하는 함수
    const dateRange = computed(() => {
      const dates = [];
      let currentDate = dayjs(groupStore.curgroup.startDate);
      const lastDate = dayjs(groupStore.curgroup.endDate);

      while (
        currentDate.isBefore(lastDate) ||
        currentDate.isSame(lastDate, "day")
      ) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }

      return dates;
    });

    const getSidoList = async () => {
      const response = await attractionApi.get("/sido");
      sidoList.value = response.data;
    };

    const getTypeList = async () => {
      const response = await attractionApi.get("/type");
      typeList.value = response.data;
    };

    const search = async (searchForm) => {
      const response = await attractionApi.post("/search", searchForm, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      searchList.value = response.data;
      console.log("searchList: ", searchList.value);
    };

    const createPlan = async (planForm) => {
      const response = await attractionApi.post("", planForm, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getPlan();
      console.log("planList: ", planList.value);
    };

    const getPlan = async () => {
      const response = await attractionApi.get("", {
        params: {
          groupId: groupStore.curgroup.groupId,
        },
      });
      planList.value = response.data;
    };

    const deletePlan = async (planId) => {
      const response = await attractionApi.delete(
        "",
        {
          params: {
            planId,
          },
        },
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );
      getPlan();
    };

    return {
      dateRange,
      sidoList,
      typeList,
      searchList,
      planList,
      getSidoList,
      getTypeList,
      search,
      createPlan,
      getPlan,
      deletePlan,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
