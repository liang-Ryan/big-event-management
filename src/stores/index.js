// ==================================================================
// pinia配置
// ==================================================================

import { createPinia } from 'pinia'

// pinia-plugin-persistedstate插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

// ==================================================================
// 导出模块
// ==================================================================

export * from './modules/user'
