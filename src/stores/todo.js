import { ref, computed } from "vue";
import { defineStore } from "pinia";
import todoApi from "@/api/todoApi";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "./group";

export const useTodoStore = defineStore(
  "todo",
  () => {
    const id = ref(0);
    const authStore = useAuthStore();
    const groupStore = useGroupStore();
    const todos = ref([]);

    const getTodoList = async () => {
      const response = await todoApi.get("", {
        params: {
          groupId: groupStore.curgroup.groupId,
        },
      });
      todos.value = response.data;
    };

    const addTodo = async (title) => {
      const obj = { content: title, groupId: groupStore.curgroup.groupId };
      const response = await todoApi.post("", obj, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getTodoList();
    };

    const changeTodoComplete = async (todo) => {
      todo.isChecked = !todo.isChecked;
      const response = await todoApi.put("", todo, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getTodoList();
      // todos.value = todos.value.map((todo) =>
      //   todo.todoId === id ? { ...todo, isChecked: !todo.isChecked } : todo
      // );
    };

    const removeTodo = async (id) => {
      // todos.value = todos.value.filter((todo) => todo.id !== id);
      const response = await todoApi.delete(
        "",
        {
          params: {
            todoId: id,
          },
        },
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );
      getTodoList();
    };

    return {
      id,
      todos,
      getTodoList,
      addTodo,
      changeTodoComplete,
      removeTodo,
    };
  },
  { persist: { storage: localStorage } }
  // { persist: { storage: sessionStorage } }
);
