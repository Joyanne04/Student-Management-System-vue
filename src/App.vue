<script setup>

import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

</script>

<template>

  <div class="app-container">
    <Navbar />

    <div class="main-content">
      <Sidebar />
      <div class="content">
        <RouterView />
      </div>
    </div>

  </div>

</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  width: 100%;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>
