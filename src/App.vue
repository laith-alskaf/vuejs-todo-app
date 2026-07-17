<template>
  <v-app :theme="theme" :class="theme === 'light' ? 'bg-grey-lighten-4' : ''">
    <!-- App Bar -->
    <v-app-bar color="primary" elevation="2" rounded>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="font-weight-bold">
        <v-icon icon="mdi-check-all" class="mr-2"></v-icon>
        ProTasker
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme" :title="theme === 'light' ? 'Dark Mode' : 'Light Mode'">
        <v-icon>{{ theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-format-list-checks"
          title="My Tasks"
          value="home"
          to="/"
          color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          title="About"
          value="about"
          to="/about"
          color="primary"
        ></v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-4">
          <v-btn block color="primary" variant="tonal">
            Upgrade to Pro
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main Content with Transition -->
    <v-main>
      <v-container class="px-4 py-6" fluid style="max-width: 1000px">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const drawer = ref(false);
const theme = ref('light');

onMounted(() => {
  const savedTheme = localStorage.getItem('vue3-theme');
  if (savedTheme) {
    theme.value = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark';
  }
});

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('vue3-theme', theme.value);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
