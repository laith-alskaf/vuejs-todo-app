<template>
  <v-card elevation="3" rounded="xl" class="mb-6 pa-2 bg-surface">
    <div class="d-flex flex-column flex-sm-row align-center gap-2">
      <v-text-field
        v-model="newTaskTitle"
        placeholder="What needs to be done?"
        variant="solo"
        flat
        hide-details
        clearable
        @keyup.enter="submitTask"
        class="flex-grow-1 w-100"
      >
        <template v-slot:prepend-inner>
          <v-icon color="primary" class="ml-2">mdi-plus-circle-outline</v-icon>
        </template>
      </v-text-field>
      
      <div class="d-flex w-100 w-sm-auto align-center" style="gap: 8px;">
        <v-select
          v-model="newTaskCategory"
          :items="['Work', 'Personal', 'Shopping', 'Health']"
          variant="solo"
          flat
          hide-details
          density="comfortable"
          class="flex-grow-1 flex-sm-grow-0"
          style="min-width: 140px"
        ></v-select>

        <v-btn
          color="primary"
          variant="flat"
          rounded="lg"
          :disabled="!newTaskTitle.trim()"
          @click="submitTask"
          class="text-none font-weight-bold px-6"
          height="48"
        >
          Add Task
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', title: string, category: string): void
}>()

const newTaskTitle = ref('')
const newTaskCategory = ref('Personal')

const submitTask = () => {
  if (newTaskTitle.value.trim()) {
    emit('add', newTaskTitle.value, newTaskCategory.value)
    newTaskTitle.value = ''
  }
}
</script>
