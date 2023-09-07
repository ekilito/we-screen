// 模块的统一导出
// 先把三个子模块统一导入进来 然后统一导出
import { useParkInfo } from './useParkInfo'
import { useInitBarChart } from './useInitBarChart'
import { useInitPieChart } from './useInitPieChart'

export {
    useParkInfo,
    useInitBarChart,
    useInitPieChart
}