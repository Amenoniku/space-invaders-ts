<template>

<div class="flex">
  <h3>Таблица рекордов</h3>
  <div class="scores">
    <span>Дата</span>
    <span>Очки</span>
  </div>
  <div class="scores" v-for="score in scores">
    <span>{{score.data}}</span>
    <span>{{score.score}}</span>
  </div>
</div>

</template>

<script setup lang="ts">
import { computed }  from 'vue'
import { useStore } from '../store'

const store = useStore()
const scores = computed(() => store.state['scores'].scores)

</script>

<style lang='scss' scoped>

.flex {
  display: flex;
  flex-direction: column;
  color: #fff;
  justify-content: start;
  align-items: start;
}

h3 {
  margin: 0 0 15px;
}

.scores {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

</style>
