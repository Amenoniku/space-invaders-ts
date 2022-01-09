<template>

  <canvas
    class="game-screen"
    ref="GameScreen"
    width="400"
    height="480"
    tabindex="0"
    @contextmenu.prevent="startPause"
  >
    <p>Ваш браузер не поддерживает Canvas</p>
  </canvas>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { Game } from "../../assets/game-scripts/Game";

let game: Game;
const GameScreen = ref(null);

const startPause = () => {
  if (!game.gameStarted) game.start();
  else game.pauseUnpause();
};
onMounted(() => {
  game = new Game(GameScreen.value as unknown as HTMLCanvasElement);
});
// onBeforeRouteLeave(() => game)
</script>

<style lang='scss' scoped>
.game-screen {
  margin: 0 10px;
  border: 1px solid #b50000;
}
</style>
