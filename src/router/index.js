// createRouter : 创建路由实例对象  new VueRouter()
// createWebHistory: 函数 创建history模式的路由  （hash/history）


import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BigScreen from '../views/BigScreen/big-index.vue'

const router = createRouter({
    // 指定当前的路由模式为history模式的路由
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView,
            redirect: '/big-screen'
        },
        // 将来做微前端接入的时候  需要匹配一个和主应用中所有路由都不一样的独一无二的路由路径
        // 定义了新的
        {
            path: '/big-screen',
            name: 'BigScreen',
            component: BigScreen
        }
    ]
})

export default router