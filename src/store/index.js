// Utilities
import { createPinia } from 'pinia'
// pinia 存本地的套件
import persistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persistedstate)

export default pinia
