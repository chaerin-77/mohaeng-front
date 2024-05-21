<script setup>
import Accordion from "@/components/diary/Plan/Accordion.vue";
import { useAttractionStore } from "@/stores/atrraction";
const attrStore = useAttractionStore();
const dateList = attrStore.dateRange;
</script>

<template>
  <div>
    <Accordion v-for="date in dateList" :key="date" class="mb-3">
      <template v-slot:title>
        <span class="text-xl text-main-color">{{ date }}</span>
      </template>
      <template v-slot:content>
        <div
          class="pl-10 pr-10 pt-2 pb-2 flex justify-between hover:bg-gray-100"
        >
          <div class="flex text-gray-600 space-x-10">
            <p class="text-lg font-semibold">부산 무슨 음식점</p>
            <p>부산 무슨 음식점</p>
            <p>부산 무슨 음식점</p>
          </div>
          <div>
            <font-awesome-icon
              icon="circle-minus"
              class="text-orange-300 mt-1 text-right w-6 h-6"
            />
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>

<style scoped></style>
