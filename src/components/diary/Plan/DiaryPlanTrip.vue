<script setup>
import Accordion from "@/components/diary/Plan/Accordion.vue";
import { useAttractionStore } from "@/stores/atrraction";
const attrStore = useAttractionStore();
const dateList = attrStore.dateRange;
attrStore.getPlan();
attrStore.searchList = [];
</script>

<template>
  <div>
    <Accordion v-for="date in dateList" :key="date" class="mb-3">
      <template v-slot:title>
        <span class="text-xl text-main-color">{{ date }}</span>
      </template>
      <template v-slot:content>
        <div v-for="list in attrStore.planList">
          <div
            v-if="list.date === date"
            class="pl-10 pr-10 pt-2 pb-2 flex justify-between hover:bg-gray-100"
          >
            <div class="flex text-gray-600 space-x-10">
              <p class="text-lg font-semibold">{{ list.title }}</p>
              <p>{{ list.contentTypeName }}</p>
              <p>{{ list.addr1 }} {{ list.addr2 }}</p>
            </div>
            <div>
              <font-awesome-icon
                icon="circle-minus"
                class="text-orange-300 hover:text-gray-500 mt-1 text-right w-6 h-6"
                @click="attrStore.deletePlan(list.planId)"
              />
            </div>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>

<style scoped></style>
