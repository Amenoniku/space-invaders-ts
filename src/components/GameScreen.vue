<template>

<canvas
  class="game-screen"
  ref="GameScreen"
  width="400"
  height="480"
>
  <p>Ваш браузер не поддерживает Canvas</p>
</canvas>

</template>

<script setup lang="ts">
import {ref, onMounted } from "vue";
import {Game} from '../assets/game-scripts/Game';

const GameScreen = ref(null)

onMounted(() => {
  const game = new Game(GameScreen.value as unknown as HTMLCanvasElement)
  game.start()
})

</script>

<style lang='scss' scoped>

.game-screen {
  margin: 0 auto ;
	border: 1px solid #B50000;
}

</style>
