<template>
  <div class="flex">
    <div class="game-rule">
      <h3>Управление</h3>
      <span>Перемещение: Курсор</span>
      <span>Выстрел: Клик ЛКМ</span>
      <span>Старт/Пауза: Клик ПКМ</span>
    </div>
    <GameScreen />
    <Scores />
  </div>
</template>

<script setup lang="ts">
import GameScreen from "../components/GameScreen.vue";
import Scores from "../components/Scores.vue";
</script>

<style scoped>
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