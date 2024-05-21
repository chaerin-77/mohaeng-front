<script setup>
import { useGroupStore } from "@/stores/group";
const groupStore = useGroupStore();
const { removeMember } = groupStore;
</script>

<template>
  <div class="">
    <div class="mb-4 mt-2 w-full">
      <div v-for="user in groupStore.memberList" :key="user.id">
        <div class="mt-1 py-3 bg-gray-100 flex justify-evenly">
          <p>{{ user.userName }}</p>
          <p>{{ user.userId }}</p>
          <font-awesome-icon
            icon="minus"
            class="mt-1 text-main-color"
            @click="removeMember(user)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
