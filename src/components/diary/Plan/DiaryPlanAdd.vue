<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};
</script>

<template>
  <div>
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
      <KakaoMapMarker
        :lat="coordinate.lat"
        :lng="coordinate.lng"
      ></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>

<style scoped></style>