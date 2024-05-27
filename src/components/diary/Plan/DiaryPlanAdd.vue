<script setup>
import { ref } from "vue";
import {
  KakaoMap,
  KakaoMapCustomOverlay,
  KakaoMapMarker,
} from "vue3-kakao-maps";
import { useAttractionStore } from "@/stores/atrraction";
import { useGroupStore } from "@/stores/group";
import { useAuthStore } from "@/stores/auth";
import attractionApi from "@/api/attractionApi";
const authStore = useAuthStore();
const attrStore = useAttractionStore();
const groupStore = useGroupStore();
const dateList = attrStore.dateRange;
attrStore.getSidoList();
attrStore.getTypeList();

// 검색 -----------
const searchForm = ref({
  sidoCode: "",
  contentTypeId: "",
  keyword: "",
});

const searchList = ref([]);

const search = async () => {
  const check = searchForm.value;
  if (
    !(
      check.sidoCode === "" &&
      check.contentTypeId === "" &&
      check.keyword === ""
    )
  ) {
    const response = await attractionApi.post("/search", searchForm.value, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    searchList.value = response.data;
    searchList.value = searchList.value.map((item) => {
      return { ...item, visible: false };
    });
    console.log("searchList: ", searchList.value);
    setcoord(searchList.value[0]);
  }
};

// 마커 -------------
const onClickKakaoMapMarker = (idx) => {
  console.log(idx, " : ", searchList.value[idx].visible);
  searchList.value[idx].visible = !searchList.value[idx].visible;
};

// 화면 이동 -------------
const coordinate = ref({
  lat: 37.566826,
  lng: 126.9786567,
});

const setcoord = (list) => {
  coordinate.value.lat = list.latitude;
  coordinate.value.lng = list.longitude;
};

// 계획 추가 -------------
const planForm = ref({
  date: "",
  groupId: groupStore.curgroup.groupId,
  contentId: 0,
});

const createPlan = async (contentId) => {
  if (planForm.value.date === "") {
    alert("날짜를 선택해주세요.");
    return;
  }
  planForm.value.contentId = contentId;
  console.log("contentID: ", contentId);
  await attrStore.createPlan(planForm.value);
};
</script>

<template>
  <div class="relative grid place-items-center w-full">
    <KakaoMap
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :draggable="true"
      style="width: 100%; height: 700px"
    >
      <div v-for="(list, idx) in searchList" :key="idx">
        <KakaoMapMarker
          :lat="list.latitude"
          :lng="list.longitude"
          :clickable="true"
          @onClickKakaoMapMarker="onClickKakaoMapMarker(idx)"
        />
        <KakaoMapCustomOverlay
          :lat="list.latitude"
          :lng="list.longitude"
          :yAnchor="1.4"
          :visible="list.visible"
        >
          <div
            v-show="list.visible === true"
            class="p-3 bg-white border border-gray-600 rounded-md"
          >
            <div class="font-semibold mb-3">
              {{ list.title
              }}<span
                style="float: right; cursor: pointer"
                @click="onClickKakaoMapMarker(idx)"
                title="닫기"
                >X</span
              >
            </div>
            <div style="display: flex">
              <div style="margin-right: 10px">
                <img :src="`${list.firstImage}`" width="73" height="70" />
              </div>
              <div class="flex-grow">
                <div
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ list.addr1 }}
                </div>
                <div
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ list.addr2 }}
                </div>
                <div
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ list.tel }}
                </div>
              </div>
            </div>
          </div></KakaoMapCustomOverlay
        >
      </div>
    </KakaoMap>
    <div class="my-3 absolute top-0 z-10">
      <form @submit.prevent="search">
        <div class="flex gap-x-4">
          <select
            v-model="planForm.date"
            name="date"
            class="border-2 border-main-color rounded-2xl"
          >
            <option value="">날짜</option>
            <option v-for="date in dateList" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
          <select
            v-model="searchForm.sidoCode"
            name="sido"
            class="border-2 border-main-color rounded-2xl"
          >
            <option value="">지역</option>
            <option
              v-for="sido in attrStore.sidoList"
              :key="sido.sidoCode"
              :value="sido.sidoCode"
            >
              {{ sido.sidoName }}
            </option>
          </select>
          <select
            v-model="searchForm.contentTypeId"
            name="t"
            class="border-2 border-main-color rounded-2xl"
          >
            <option value="">유형</option>
            <option
              v-for="t in attrStore.typeList"
              :key="t.contentTypeId"
              :value="t.contentTypeId"
            >
              {{ t.contentTypeName }}
            </option>
          </select>
          <input
            type="text"
            name=""
            id=""
            v-model="searchForm.keyword"
            placeholder="검색어를 입력하세요"
            class="border-2 border-main-color rounded-2xl"
          />
          <input
            type="submit"
            value="검색"
            class="bg-main-color px-3 rounded-xl text-white hover:bg-gray-500"
          />
        </div>
      </form>
    </div>
    <div class="absolute top-20 right-3 z-10 w-2/5 h-[36rem] overflow-y-scroll">
      <div
        v-for="list in searchList"
        :key="list.contentId"
        class="bg-white border-x-0 border-t-0 border-2 border-main-color rounded-md p-4 mb-3 w-full shadow-lg"
      >
        <div class="flex w-full">
          <div
            class="w-10 h-14"
            :style="`background-image: url(${list.firstImage}); background-size: cover; background-position: center;`"
          ></div>
          <div class="ml-3 w-full">
            <div class="flex justify-between">
              <div class="flex">
                <p class="text-lg font-semibold">
                  <a
                    href="#"
                    class="hover:no-underline hover:text-main-color"
                    @click.prevent="setcoord(list)"
                    >{{ list.title }}</a
                  >
                </p>
                <p class="text-sm ml-3 text-gray-500">
                  {{ list.contentTypeName }}
                </p>
              </div>
              <font-awesome-icon
                icon="circle-plus"
                class="text-orange-300 w-5 h-5 hover:text-gray-500"
                @click="createPlan(list.contentId)"
              />
            </div>
            <p class="text-gray-500 w-full">
              {{ list.addr1 }} {{ list.addr2 }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
