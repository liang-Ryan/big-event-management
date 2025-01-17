// ==================================================================
// pinia配置
// ==================================================================

import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia

// ==================================================================
// pinia-plugin-persistedstate插件
// ==================================================================

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)
export * from './modules/user'
