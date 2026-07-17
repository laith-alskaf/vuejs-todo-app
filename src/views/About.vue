<template>
  <v-card elevation="2" rounded="xl" class="pa-8 text-center bg-white">
    <v-icon size="100" color="primary" class="mb-6">mdi-rocket-launch</v-icon>
    <h1 class="text-h3 font-weight-bold text-primary mb-4">About ProTasker</h1>
    <p class="text-h6 text-grey-darken-1 mb-8 mx-auto" style="max-width: 600px;">
      ProTasker is a premium, beautifully designed task management application built with the latest web technologies.
    </p>
    
    <v-row class="mt-8 text-left" justify="center">
      <v-col cols="12" md="4">
        <v-card variant="outlined" rounded="lg" class="h-100 pa-4 border-primary-light">
          <v-icon size="40" color="info" class="mb-3">mdi-vuejs</v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">Vue 3 & Vite</h3>
          <p class="text-body-2 text-grey-darken-1">Built with Composition API and blazingly fast Vite bundler for ultimate performance.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined" rounded="lg" class="h-100 pa-4 border-primary-light">
          <v-icon size="40" color="success" class="mb-3">mdi-database-check</v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">Local Storage</h3>
          <p class="text-body-2 text-grey-darken-1">100% private. Your tasks never leave your browser and are instantly available offline.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined" rounded="lg" class="h-100 pa-4 border-primary-light">
          <v-icon size="40" color="deep-purple" class="mb-3">mdi-material-design</v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">Vuetify 3</h3>
          <p class="text-body-2 text-grey-darken-1">Modern UI components, beautiful animations, and fully responsive design.</p>
        </v-card>
      </v-col>
    </v-row>

    <div class="mt-12">
      <v-btn color="primary" size="x-large" rounded="pill" class="px-8 font-weight-bold text-none" to="/">
        Go back to Tasks
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.border-primary-light {
  border-color: rgba(var(--v-theme-primary), 0.2) !important;
}
</style>
