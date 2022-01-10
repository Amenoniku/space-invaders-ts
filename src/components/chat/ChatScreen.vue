<template>
  <div class="chat-screen">
    <MessageComponent
      v-for="message in messages"
      :message="message"
    />
    <textarea
      class="chat-screen__textarea"
      name="textMessage"
      v-model="textMessage"
      placeholder="Введи сообщение, Enter - отправить"
      @keyup.enter="sendMessage($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useStore } from "../../store";

import MessageComponent from "./Message.vue";

const textMessage: Ref<string> = ref('')

const store = useStore();
const messages = computed(() => store.state["chat"].messages);

const sendMessage: Function = (e: KeyboardEvent) => {
  const message = textMessage.value.trim()
  if (message.length) {
    store.dispatch('addNewMessage', {message})
    textMessage.value = ''
    store.dispatch('addNewMessage', {message: randomString(), author: 'Bot'})
  }
}

const randomString: Function = (): string => {
  let result: string = ''
  const characters: string = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789'
  const charactersLength: number = characters.length
  const length: number = Math.floor(Math.random() * charactersLength)
  for ( let i: number = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
</script>

<style lang='scss' scoped>
.chat-screen {
  margin: 0 10px;
  border: 1px solid #b50000;
  width: 400px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
  overflow-x: hidden;
  &__textarea {
    min-height: 50px;
    max-width: 100%;
  }
}
</style>
