import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 导入乾坤插件
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
    base: 'http://localhost:8089/', // 子应用线上服务器的绝对地址  目的是为了能够正确的加载子应用自己的静态资源(js css image)
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
        // 解决开发环境下的静态资源访问问题
        origin: '//127.0.0.1:5173'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    }
})