<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import GameScreen from "./components/GameScreen.vue";
import Scores from "./components/Scores.vue";
</script>

<template>
  <div class="flex">
    <div class="game-rule">
      <h3>Управление</h3>
      <span>Перемещение: Курсор</span>
      <span>Выстрел: Клик мышкой</span>
    </div>
    <GameScreen />
    <Scores />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex {
  display: flex;
  justify-content: center;
}

.game-rule {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  font: bold 12px Arial;
  color: #fff;
}

</style>
