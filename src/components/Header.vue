<template>
  <header class="header">
    <router-link
      to="/game"
      class="header__link"
    >
      Space Invaders
    </router-link>
    <router-link
      to="/chat"
      class="header__link"
    >
      Vue 3 Chat
    </router-link>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header {
  width: 100vw;
  padding: 20px 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  background: #0d0d0d;
  &__link {
    color: white;
    margin-right: 160px;
  }
  .router-link-active {
    color: #ff8686;
  }
}
</style>