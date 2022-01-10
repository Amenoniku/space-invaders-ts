<template>
  <div class="flex">
    <div>
      <input
        type="text"
        placeholder="Твой ник"
        v-model="userName"
      >
      <br>
      Твой ник: {{userName}}
    </div>

    <ChatScreen />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, onMounted } from "vue";
import { useStore } from "../store";
import ChatScreen from "../components/chat/ChatScreen.vue";

const store = useStore();
const userName = computed({
  get() {
    return store.state["chat"].userName;
  },
  set(value: string) {
    store.dispatch("addUserName", value);
  },
});
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  color: white;
}
input {
  height: fit-content;
}
</style>