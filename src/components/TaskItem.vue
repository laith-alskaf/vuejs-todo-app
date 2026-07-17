<template>
  <v-list-item
    :class="{ 'bg-grey-lighten-4 opacity-70': todo.completed }"
    class="px-4 py-3 task-item-hover"
  >
    <template v-slot:prepend>
      <v-checkbox-btn
        :model-value="todo.completed"
        color="success"
        class="mr-3"
        @update:model-value="$emit('toggle', todo.id)"
      ></v-checkbox-btn>
    </template>

    <v-list-item-title
      :class="{ 'text-decoration-line-through text-grey': todo.completed }"
      class="text-h6 font-weight-medium mb-1 transition-fast-in-fast-out cursor-pointer"
      @click="$emit('edit', todo.id)"
    >
      {{ todo.title }}
    </v-list-item-title>
    
    <v-list-item-subtitle class="d-flex flex-wrap align-center gap-2 mt-2">
      <!-- Category -->
      <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">
        <v-icon start size="small">mdi-folder</v-icon>
        {{ todo.category }}
      </v-chip>

      <!-- Priority -->
      <v-chip size="x-small" :color="priorityColor" variant="flat" class="font-weight-bold">
        <v-icon start size="small">mdi-flag</v-icon>
        {{ todo.priority.toUpperCase() }}
      </v-chip>

      <!-- Due Date -->
      <v-chip v-if="todo.dueDate" size="x-small" :color="isOverdue ? 'error' : 'grey-darken-1'" variant="outlined" class="font-weight-bold">
        <v-icon start size="small">mdi-calendar-alert</v-icon>
        {{ todo.dueDate }}
      </v-chip>
      
      <!-- Created Time -->
      <span class="text-caption text-grey ml-auto d-flex align-center">
        <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
        {{ new Date(todo.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
      </span>
    </v-list-item-subtitle>

    <template v-slot:append>
      <v-btn
        icon="mdi-pencil"
        variant="text"
        color="info"
        class="mr-1 opacity-80 hover-opacity-100"
        @click.stop="$emit('edit', todo.id)"
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        variant="text"
        color="error"
        class="opacity-80 hover-opacity-100"
        @click.stop="$emit('delete', todo.id)"
      ></v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '@/composables/useTodos'

const props = defineProps<{ todo: Todo }>()

defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

const priorityColor = computed(() => {
  switch (props.todo.priority) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'info'
    default: return 'grey'
  }
})

const isOverdue = computed(() => {
  if (!props.todo.dueDate || props.todo.completed) return false
  const due = new Date(props.todo.dueDate)
  due.setHours(23, 59, 59, 999)
  return due.getTime() < Date.now()
})
</script>

<style scoped>
.task-item-hover {
  transition: all 0.2s ease-in-out;
}
.task-item-hover:hover {
  background-color: rgba(0,0,0,0.02) !important;
  transform: translateX(4px);
}
.opacity-70 { opacity: 0.7; }
.opacity-80 { opacity: 0.8; }
.hover-opacity-100:hover { opacity: 1; }
.gap-2 { gap: 8px; }
</style>
