<template>
  <div class="d-flex flex-column flex-md-row align-center mb-4" style="gap: 16px;">
    <v-text-field
      :model-value="searchQuery"
      @update:model-value="$emit('update:searchQuery', $event)"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search tasks..."
      variant="outlined"
      density="compact"
      hide-details
      class="flex-grow-1 w-100"
      rounded="lg"
      clearable
    ></v-text-field>

    <v-btn-toggle
      :model-value="filter"
      @update:model-value="$emit('update:filter', $event || 'all')"
      color="primary"
      variant="outlined"
      divided
      rounded="lg"
      class="flex-grow-0 w-100 w-md-auto justify-center"
      mandatory
    >
      <v-btn value="all" class="text-none">All</v-btn>
      <v-btn value="active" class="text-none">Active</v-btn>
      <v-btn value="completed" class="text-none">Completed</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
  filter: string
}>()

defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:filter', value: string): void
}>()
</script>
