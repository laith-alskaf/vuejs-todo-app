<template>
  <v-card elevation="0" rounded="xl" class="bg-transparent mb-6">
    <div class="d-flex align-center justify-space-between mb-2">
      <div>
        <h1 class="text-h4 font-weight-bold text-primary mb-1">Today's Tasks</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          {{ completedCount }} of {{ totalCount }} tasks completed
        </p>
      </div>
      <v-chip color="primary" variant="flat" size="x-large" class="font-weight-bold">
        {{ new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }}
      </v-chip>
    </div>
    
    <v-progress-linear
      :model-value="progress"
      color="success"
      height="14"
      rounded
      striped
      class="mt-4"
    >
      <template v-slot:default="{ value }">
        <strong class="text-white" style="font-size: 0.75rem;">{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalCount: number
  completedCount: number
}>()

const progress = computed(() => {
  if (props.totalCount === 0) return 0
  return (props.completedCount / props.totalCount) * 100
})
</script>
