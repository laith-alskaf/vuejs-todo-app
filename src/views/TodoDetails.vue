<template>
  <v-card elevation="2" rounded="xl" class="bg-surface pa-6" v-if="todo">
    <div class="d-flex align-center justify-space-between mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" color="grey-darken-1" @click="router.push('/')"></v-btn>
      <h2 class="text-h5 font-weight-bold text-primary">Edit Task</h2>
      <v-btn
        icon="mdi-delete"
        variant="text"
        color="error"
        @click="handleDelete"
      ></v-btn>
    </div>

    <v-form @submit.prevent="saveChanges" class="mt-4">
      <v-text-field
        v-model="editForm.title"
        label="Task Title"
        variant="outlined"
        color="primary"
        class="mb-4"
        hide-details="auto"
      ></v-text-field>

      <v-textarea
        v-model="editForm.description"
        label="Description (Optional)"
        variant="outlined"
        color="primary"
        rows="3"
        class="mb-4"
        hide-details="auto"
      ></v-textarea>

      <v-row class="mb-2">
        <v-col cols="12" md="4">
          <v-combobox
            v-model="editForm.category"
            :items="['Work', 'Personal', 'Shopping', 'Health']"
            label="Category"
            variant="outlined"
            color="primary"
            hide-details="auto"
          ></v-combobox>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="editForm.priority"
            :items="['low', 'medium', 'high']"
            label="Priority"
            variant="outlined"
            color="primary"
            hide-details="auto"
          >
            <template v-slot:selection="{ item }">
              <v-chip
                :color="priorityColor(item.value)"
                size="small"
                class="text-uppercase font-weight-bold"
              >
                {{ item.title }}
              </v-chip>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="editForm.dueDate"
            label="Due Date (Optional)"
            type="date"
            variant="outlined"
            color="primary"
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="d-flex align-center justify-space-between bg-grey-lighten-4 pa-4 rounded-lg mb-6 mt-4">
        <span class="text-subtitle-1 font-weight-medium">Status:</span>
        <v-switch
          v-model="editForm.completed"
          :label="editForm.completed ? 'Completed' : 'Pending'"
          color="success"
          hide-details
          class="flex-grow-0"
        ></v-switch>
      </div>

      <div class="d-flex justify-end gap-3">
        <v-btn variant="tonal" color="grey-darken-1" class="text-none font-weight-bold px-6" rounded="lg" @click="router.push('/')">
          Cancel
        </v-btn>
        <v-btn type="submit" color="primary" class="text-none font-weight-bold px-8" rounded="lg" elevation="2">
          Save Changes
        </v-btn>
      </div>
    </v-form>
  </v-card>
  
  <v-card v-else class="pa-12 text-center bg-surface" rounded="xl">
    <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
    <h2 class="text-h5 text-medium-emphasis mb-2">Task Not Found</h2>
    <p class="text-grey mb-6">The task you are looking for does not exist or has been deleted.</p>
    <v-btn color="primary" rounded="pill" class="text-none px-6" to="/">Return Home</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodos, Todo } from '@/composables/useTodos'

const props = defineProps<{ id: string }>()
const router = useRouter()
const { getTodoById, updateTodo, deleteTodo } = useTodos()

const todoRef = getTodoById(props.id)
const todo = ref<Todo | null>(null)

const editForm = ref({
  title: '',
  description: '',
  category: 'Personal',
  dueDate: '' as string | undefined,
  priority: 'medium' as Todo['priority'],
  completed: false
})

const priorityColor = (priority: any) => {
  switch (priority as string) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'info'
    default: return 'grey'
  }
}

onMounted(() => {
  if (todoRef.value) {
    todo.value = todoRef.value
    editForm.value = {
      title: todoRef.value.title,
      description: todoRef.value.description || '',
      category: todoRef.value.category || 'Personal',
      dueDate: todoRef.value.dueDate,
      priority: todoRef.value.priority,
      completed: todoRef.value.completed
    }
  }
})

const saveChanges = () => {
  if (!editForm.value.title.trim()) return
  
  updateTodo(props.id, {
    title: editForm.value.title.trim(),
    description: editForm.value.description,
    category: editForm.value.category,
    dueDate: editForm.value.dueDate || undefined,
    priority: editForm.value.priority,
    completed: editForm.value.completed
  })
  
  router.push('/')
}

const handleDelete = () => {
  deleteTodo(props.id)
  router.push('/')
}
</script>
