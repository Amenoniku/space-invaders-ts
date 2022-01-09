import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./store"
import { router } from "./pages"

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

console.debug("mounted store", store)
