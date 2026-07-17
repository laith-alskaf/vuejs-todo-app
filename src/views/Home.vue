<template>
  <v-card elevation="0" rounded="xl" class="bg-transparent">
    <!-- Progress Stats Component -->
    <TaskStats :totalCount="totalTasks" :completedCount="completedTasks" />

    <!-- Add Task Component -->
    <TaskInput @add="handleAddTask" />

    <!-- Filters and Search Component -->
    <TaskFilter v-model:searchQuery="searchQuery" v-model:filter="filter" />

    <!-- Task List -->
    <v-card elevation="2" rounded="xl" class="bg-surface overflow-hidden">
      <v-list lines="two" bg-color="transparent" class="pa-0">
        <v-fade-transition group hide-on-leave>
          <template v-for="(todo, index) in filteredTodos" :key="todo.id">
            <v-divider v-if="index > 0"></v-divider>
            <TaskItem
              :todo="todo"
              @toggle="toggleComplete"
              @edit="goToDetails"
              @delete="handleDeleteTask"
            />
          </template>
        </v-fade-transition>

        <!-- Empty State -->
        <v-card-text
          v-if="filteredTodos.length === 0"
          class="text-center py-12"
        >
          <v-icon size="64" color="grey-lighten-2" class="mb-4"
            >mdi-clipboard-text-outline</v-icon
          >
          <h3 class="text-h6 text-medium-emphasis font-weight-regular">
            No tasks found
          </h3>
          <p class="text-grey">Enjoy your day or add a new task above!</p>
        </v-card-text>
      </v-list>
    </v-card>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="bottom right"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ snackbar.icon }}</v-icon>
        <span class="font-weight-medium">{{ snackbar.text }}</span>
      </div>
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useTodos } from "@/composables/useTodos";

import TaskStats from "@/components/TaskStats.vue";
import TaskInput from "@/components/TaskInput.vue";
import TaskFilter from "@/components/TaskFilter.vue";
import TaskItem from "@/components/TaskItem.vue";

const router = useRouter();
const { todos, addTodo, deleteTodo, toggleComplete } = useTodos();

const searchQuery = ref("");
const filter = ref("all");
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
  icon: "mdi-check-circle",
});

const showNotification = (
  text: string,
  color = "success",
  icon = "mdi-check-circle",
) => {
  snackbar.value = { show: true, text, color, icon };
};

const handleAddTask = (title: string, category: string) => {
  addTodo(title, category);
  showNotification("Task added successfully!");
};

const handleDeleteTask = (id: string) => {
  deleteTodo(id);
  showNotification("Task deleted", "error", "mdi-delete-empty");
};

const goToDetails = (id: string) => {
  router.push(`/todo/${id}`);
};

const totalTasks = computed(() => todos.value.length);
const completedTasks = computed(
  () => todos.value.filter((t) => t.completed).length,
);

const filteredTodos = computed(() => {
  let result = todos.value;

  // Apply Status Filter
  if (filter.value === "active") {
    result = result.filter((t) => !t.completed);
  } else if (filter.value === "completed") {
    result = result.filter((t) => t.completed);
  }

  // Apply Search Query
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)),
    );
  }

  return result;
});
</script>
