<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import LoginView from "./views/LoginView.vue";
</script>

<template>
  <!-- <header>
    <Navigation />
  </header> -->
  <div class="container">
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView /> -->
  </div>
  <LoginView />
</template>

<style scoped></style>
