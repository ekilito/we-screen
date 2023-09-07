<script setup>

import {  onMounted } from 'vue'

// import * as echarts from 'echarts'

/**
 2D图表
   1. 以npm方法把三方图表库安装到本地项目中
   2. 看官方的demo样例来实现一个简单的图表渲染
      1. 引入echarts
      2. 准备一个渲染的节点 （宽高可用的dom节点）
      3. 使用init进行图表的实例化
      4. 按照业务的需求准备图表参数（使用后端数据替换掉静态数据）
      5. 调用图表的setOption方法传入参数完成图表的渲染
      重点：初始化操作都必须放到mounted钩子函数中去做

  小坑：图表的渲染函数写到了mounted钩子里面 所以响应式数据哪怕已经发生变化了
        但是图表只会在首次渲染的时候去读数据， 这个时候读到是什么就是什么
        并不会随着数据的变化而重新渲染

  模板之所以可用用可选链解决问题  新数据返回之后 再次渲染
  模板本身会和响应式数据发生关联  一旦依赖的响应式数据发生变化
  整个模板会再次读取数据使用新数据再次渲染
 */

// 获取园区概括数据
// const parkInfo = ref({})
// 
// const getParkInfo = async () => {
//   // 1. 调用接口
//   // 2. 覆盖响应式数据
//   const res = await getParkInfoAPI()
//   parkInfo.value = res.data
// }
import { useParkInfo  , useInitBarChart ,  useInitPieChart} from './composables'  // 通过 index中转 统一导入进来
// import { useInitBarChart} from './composables/useInitBarChart'
// import { useInitPieChart } from './composables/useInitPieChart'
const { parkInfo, getParkInfo } = useParkInfo()
const {initBarChart , barChart} =  useInitBarChart(parkInfo)
const { pieChart, initPieChart } = useInitPieChart(parkInfo)


// 渲染年度收入分析图表
// echats渲染流程： 1. 实例化 2. 准备配置参数 3. 实例.setOption(参数)
// 1. 获取要渲染的节点位置
/* const barChart = ref(null)
// 2. 初始化图表实例（前置要求 必须dom是可用状态 barChart成功拿到了dom元素才可以 - mounted中做初始化）
function initBarChart () {
  const myBarChart = echarts.init(barChart.value)

  // 1. 解构图表数据
    const { parkIncome } = parkInfo.value
  // 2. 准备options数据
  const barOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      // 让图表占满容器
      top: '10px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
          show: false,
        },
        data: parkIncome?.xMonth,
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '园区年度收入',
        type: 'bar',
        barWidth: '10px',
        data: parkIncome?.yIncome.map((item, index) => {
          const color =
            index % 2 === 0
            // 偶数行颜色
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0.23, color: '#74c0f8' },
                { offset: 1, color: 'rgba(116,192,248,0.00)' },
              ])
              // 基数行颜色
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0.23, color: '#ff7152' },
                { offset: 1, color: 'rgba(255,113,82,0.00)' },
              ])
          return { value: item, itemStyle: { color } }
        }),
      },
    ],
    textStyle: {
      color: '#B4C0CC',
    },
  }
  // 3. 渲染图表
  barOptions && myBarChart.setOption(barOptions)
} */

// 渲染园区产业分布图表
/* const pieChart = ref(null)

const initPieChart = () => {

  // 实例化图表
  const myPieChart = echarts.init(pieChart.value)

  const { parkIndustry } = parkInfo.value
  // 准备参数
  const pieOption = {
    color: [
      '#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
    legend: {
      itemGap: 20,
      bottom: '0',
      icon: 'rect',
      itemHeight: 10, // 图例icon高度
      itemWidth: 10, // 图例icon宽度
      textStyle: {
        color: '#c6d1db',
      },
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '园区产业分析',
        type: 'pie',
        radius: ['55%', '60%'], // 设置内圈与外圈的半径使其呈现为环形
        center: ['50%', '40%'], // 圆心位置， 用于调整整个图的位置
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`
          }
        },
        label: {
          show: false,
          position: 'center',
        },
        data: parkIndustry,
      },
    ],

  }

  pieOption && myPieChart.setOption(pieOption)
} */

onMounted(async() => {
  // 保证图表依赖的数据已经完全返回  在做图标的初始化
  await getParkInfo()
  initBarChart()
  initPieChart()
})

</script>


<template>
  <div class="all-charts">
    <!-- 园区概况 -->
    <div class="section-one">
      <img class="img-header"
        src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
        alt="" />
      <div class="icons-container">
        <div class="item">
          <div class="icons-item building-icon">
                          <!-- 
                为什么parkInfo.base是一个undefined？
                首次渲染（后端数据没有返回）
                parkInfo - {} - {}.base -> undefined -> undefined.buidingTotal
                
                二次渲染（后端数据返回之后 响应式状态发生变化 再次引起模版渲染）

                场景：访问一个空对象多层次的属性
                解决办法：可选链?.   保证必须前面有值才会继续往后进行点运算
               -->
            <span class="number">
              {{ parkInfo.base?.buildingTotal }}
            </span>
          </div>
          <span class="title">楼宇总数</span>
          <span class="unity">（栋）</span>
        </div>
        <div class="item">
          <div class="icons-item enterprise-icon">
            <span class="number">
              {{ parkInfo.base?.enterpriseTotal }}
            </span>
          </div>
          <span class="title">入驻企业总数</span>
          <span class="unity">（家）</span>
        </div>
        <div class="item">
          <div class="icons-item car-icon">
            <span class="number">
              {{ parkInfo.base?.parkingTotal  }}
            </span>
          </div>
          <span class="title">车位总数</span>
          <span class="unity">（个）</span>
        </div>
        <div class="item">
          <div class="icons-item rod-icon">
            <span class="number">
              {{ parkInfo.base?.chargePoleTotal }}
            </span>
          </div>
          <span class="title">一体杆总数</span>
          <span class="unity">（个）</span>
        </div>
      </div>
    </div>
     <!-- 园区年度收入分析 -->
  <div class="section-two">
    <img class="img-header"
      src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
      alt="" />
    <div class="bar-chart-titile">
      <span>单位：元</span>
      <div>
        <span class="bar-icon blue-bar-icon"></span>
        <span class="bar-icon red-bar-icon"></span>
        收入情况
      </div>
    </div>
    <div class="bar-chart" ref="barChart"></div>
  </div>
    <!-- 园区产业分布 -->
<div class="section-three">
  <img class="img-header"
    src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
    alt="" />
  <div class="pie-chart" ref="pieChart"></div>
</div>
  </div>
</template>

<style scoped lang="scss">
 .all-charts {
    position: absolute;
    top: 0;
    left: 0;
    width: 480px;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(to left, rgba(0, 6, 15, 0.00) 0%, rgba(0, 6, 15, 0.00) 20%, rgba(0, 0, 0, 0.40) 30%, rgba(0, 0, 0, 0.60) 40%, rgba(1, 4, 11, 1) 70%, #04070d 100%);

    .img-header {
      height: 30px;
    }
  }

  .section-one {
    flex-basis: 25%;
    .icons-container {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;

      .item {
        text-align: center;
        display: flex;
        flex-direction: column;
        flex: 1;

        .icons-item {
          height: 80px;
          position: relative;

          .number {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
            color: #ffffff;
          }
        }

        .building-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
        }

        .enterprise-icon {
          background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
        }

        .rod-icon {
          background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
        }

        .car-icon {
          background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
        }

        .title,
        .unity {
          font-size: 14px;
          color: #cdd7e1;
        }

        .title {
          margin-top: 8px;
        }
      }
    }
  }

  .section-two {
    flex-basis: 35%;
    margin-top: 50px;

    .bar-chart {
      width: 100%;
      height: calc(100% - 90px);
    }
  }

  .section-three {
    flex-basis: 40%;

    .pie-chart {
      position: relative;
      margin: 0 auto;
      padding-bottom: 20px;
      width: 80%;
      height: calc(100% - 40px);
    }
  }
</style>