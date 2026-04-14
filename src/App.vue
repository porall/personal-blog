<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>