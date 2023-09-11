import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 导入乾坤插件
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 这里的名称要和主应用改造是配置项中的name保持一致
        qiankun('big-screen', {
            useDevMode: true
        })
    ],
    server: {
        // 防止开发阶段的assets 静态资源加载问题
        // 子应用被主应用加载过去之后 代码加载的静态资源 图片
        // 图片地址  走主应用地址  http://localhost:8081/assests/a.png 
        origin: '//localhost:5173'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    }
})