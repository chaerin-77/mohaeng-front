import { ref, computed } from "vue";
import { defineStore } from "pinia";
import todoApi from "@/api/todoApi";
import { useAuthStore } from "@/stores/auth";
import { useGroupStore } from "@/stores/group";

export const useTodoStore = defineStore(
  "todo",
  () => {
    const id = ref(0);
    const authStore = useAuthStore();
    const groupStore = useGroupStore();
    const todoList = ref([]);

    const getTodoList = async () => {
      const response = await todoApi.get("", {
        params: {
          groupId: groupStore.curgroup.groupId,
        },
      });
      todoList.value = response.data;
    };

    const addTodo = async (title) => {
      const obj = { content: title, groupId: groupStore.curgroup.groupId };
      const response = await todoApi.post("", obj, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getTodoList();
    };

    const changeTodoComplete = async (idx) => {
      const todo = todoList.value[idx];
      todo.checked = !todo.checked;
      const response = await todoApi.put("", todo, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getTodoList();
    };

    const removeTodo = async (id) => {
      const response = await todoApi.delete("", {
        params: {
          todoId: id,
        },
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      getTodoList();
    };

    return {
      id,
      todoList,
      getTodoList,
      addTodo,
      changeTodoComplete,
      removeTodo,
    };
  },
  { persist: { storage: sessionStorage } }
);
