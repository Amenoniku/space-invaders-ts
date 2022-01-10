<template>
  <div :class="`message message--${authorIsYou ? 'you' : 'not-you'}`">
    <span class="">{{authorIsYou ? userName : message.author}}</span><br>
    <span class="">{{message.data}}</span><br>
    <span class="">{{message.text}}</span><br>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../../store";
const props = defineProps<{
  message: Message;
}>();
const store = useStore();
const userName = computed(() => store.state["chat"].userName);
const authorIsYou = computed(() => props.message.author === 'you' )
</script>

<style scoped lang="scss">
.message {
  background-color: rgb(75, 0, 128);
  margin: 10px;
  padding: 12px;
  width: 70%;
  border-radius: 20px;
  line-break: anywhere;
  &--you {
    text-align: left;
  }
  &--not-you {
    text-align: right;
    background-color: rgb(97, 2, 97);
    align-self: flex-end;
  }
  span:last-of-type {
    display: inline-block;
    margin-top: 10px;
  }
}
</style>