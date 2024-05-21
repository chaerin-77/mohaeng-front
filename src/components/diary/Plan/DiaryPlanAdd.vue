<script setup>
import { ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { useAttractionStore } from "@/stores/atrraction";
const attrStore = useAttractionStore();
const dateList = attrStore.dateRange;
attrStore.getSidoList();
attrStore.getTypeList();

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};

const date = ref("");
const searchForm = ref({
  sidoCode: "",
  contentTypeId: "",
  keyword: "",
});
</script>

<template>
  <div class="relative grid place-items-center">
    <KakaoMap
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :draggable="true"
      style="width: 100%; height: 700px"
    >
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng">
      </KakaoMapMarker>
    </KakaoMap>
    <div class="my-3 absolute top-0 z-10">
      <form action="">
        <div class="flex gap-x-4">
          <select
            v-model="date"
            name="date"
            class="border-2 border-main-color rounded-2xl"
          >
            <option value="">날짜</option>
            <option v-for="date in dateList" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
          <select name="region" class="border-2 border-main-color rounded-2xl">
            <option value="">지역</option>
            <option
              v-for="sido in attrStore.sidoList"
              :key="sido.sidoCode"
              :value="sido.sidoCode"
            >
              {{ sido.sidoName }}
            </option>
          </select>
          <select name="type" class="border-2 border-main-color rounded-2xl">
            <option value="">유형</option>
            <option
              v-for="type in attrStore.typeList"
              :key="type.contentTypeId"
              :value="type.contentTypeId"
            >
              {{ type.contentTypeName }}
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
    <div class="absolute top-20 right-3 z-10 w-2/5 flex-wrap">
      <div
        class="bg-white border-x-0 border-t-0 border-2 border-main-color rounded-md p-4 mb-3 w-full"
      >
        <div class="flex w-full">
          <div class="bg-gray-500 w-10 h-14"></div>
          <div class="ml-3 w-full">
            <div class="flex justify-between">
              <div class="flex">
                <p class="text-lg font-semibold">부산 어떤 카페</p>
                <p class="text-sm ml-3 text-gray-500">카페</p>
              </div>
              <font-awesome-icon
                icon="circle-plus"
                class="text-orange-300 w-5 h-5"
              />
            </div>
            <p class="text-gray-500 w-full">부산광역시 무슨동 무슨로 12</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
