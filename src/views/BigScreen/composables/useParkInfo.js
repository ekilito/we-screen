import { getParkInfoAPI } from '@/apis/park.js'
import { ref } from 'vue'

function useParkInfo() {
    // 放置所有的业务逻辑
    const parkInfo = ref({})

    const getParkInfo = async() => {
        // 1. 调用接口
        // 2. 覆盖响应式数据
        const res = await getParkInfoAPI()
        parkInfo.value = res.data
    }

    // 组件中还需要用到这些数据和方法
    // 在组件中通过调用这个函数 得到这个对象
    // 然后通过解构赋值的方式再把数据和方法引入到组件中使用
    return { parkInfo, getParkInfo }

}

export { useParkInfo }