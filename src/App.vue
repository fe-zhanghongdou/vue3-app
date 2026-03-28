<script setup lang="ts"></script>

<template>
  <nav class="nav">
    <router-link to="/">首页</router-link>
    <router-link to="/waterfall">瀑布流</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
#app {
  min-height: 100vh;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.nav a {
  padding: 8px 20px;
  color: #495057;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav a:hover {
  background: #e9ecef;
}

.nav a.router-link-active {
  background: #42b883;
  color: white;
}
</style>
