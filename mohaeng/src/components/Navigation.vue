<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
    <div class="container">
      <!-- <router-link :to="{ name: 'main' }" class="navbar-brand"> -->
      <img
        src="/src/assets/logo.png"
        class="rounded mx-auto d-block"
        alt="..."
        height="60px"
      />
      <!-- </router-link> -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="#">알림</a></li>
          <li class="nav-item"><a class="nav-link" href="#">마이 페이지</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
