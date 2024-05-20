<script setup>
import { useTodoStore } from "@/stores/todo";
import { ref } from "vue";

const todoStore = useTodoStore();
const { changeTodoComplete, removeTodo } = todoStore;

const title = ref("");

const addTodo = () => {
  if (title.value.length > 0) {
    todoStore.addTodo(title.value);
    title.value = "";
  }
};
</script>

<template>
  <div v-for="(todo, idx) in todoStore.todoList" :key="todo.id">
    <div
      class="flex hover:bg-gray-50 py-2 px-3 justify-between"
      @click="changeTodoComplete(idx)"
    >
      <div class="flex">
        <font-awesome-icon
          v-if="todo.checked"
          icon="square-check"
          class="w-5 h-5 mt-1"
        />
        <font-awesome-icon
          v-else
          icon="fa-regular fa-square"
          class="w-5 h-5 mt-1"
        />
        <p :class="{ 'line-through': todo.checked }" class="pl-20 text-lg">
          {{ todo.content }}
        </p>
      </div>
      <font-awesome-icon
        icon="fa-regular fa-trash-can"
        class="text-red-400 w-5 h-5 mt-1 hover:text-gray-400"
        @click="removeTodo(todo.todoId)"
      />
    </div>
  </div>
  <!-- todo 입력 -->
  <div class="input-group mt-5">
    <input
      type="text"
      class="form-control mr-3 rounded-md"
      v-model="title"
      @keypress.enter="addTodo"
      placeholder="할일 추가 ..."
    />
    <button
      class="bg-main-color text-white px-3 rounded-md hover:bg-gray-400"
      type="button"
      @keyup.enter="addTodo"
      @click="addTodo"
    >
      추가
    </button>
  </div>
</template>

<style scoped></style>
