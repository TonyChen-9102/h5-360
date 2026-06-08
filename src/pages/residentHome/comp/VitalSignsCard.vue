<template>
  <!---生命体征卡片-->
  <view class="vital-signs-card">
    <view class="vital-signs-header">
      <text class="vital-signs-title u-fs32 u-fw500">生命体征</text>
      <view class="vital-signs-tabs">
        <view
            v-for="metric in cardData.metrics"
            :key="metric.key"
            class="vital-signs-tab u-fs24 u-fw400"
            :class="activeMetric.key === metric.key ? 'vital-signs-tab-active' : ''"
            @click="handleMetricClick(metric.key)"
        >
          <text>{{ metric.title }}</text>
        </view>
      </view>
      <u-image
          src="/static/health/ic-qp@2x.png"
          mode="aspectFit"
          width="32rpx"
          height="32rpx"
      ></u-image>
    </view>

    <view class="vital-signs-legend-row">
      <text class="vital-signs-unit u-fs24 u-fw400">单位:{{ activeUnitText }}</text>
      <view class="vital-signs-legends">
        <view
            v-for="series in activeSeries"
            :key="series.name"
            class="vital-signs-legend"
        >
          <view class="vital-signs-legend-line" :style="{ background: series.color }"></view>
          <view class="vital-signs-legend-dot" :style="{ borderColor: series.color }"></view>
          <text class="vital-signs-legend-text u-fs24 u-fw400">{{ series.name }}</text>
        </view>
      </view>
    </view>

    <view ref="chart" class="vital-signs-chart"></view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import * as echarts from 'echarts'
import {VitalSignCardData, VitalSignMetric, VitalSignMetricKey, VitalSignSeries} from '../modelData/vitalSignsModel'

@Component({
  name: 'VitalSignsCard'
})
export default class VitalSignsCardComp extends Vue {
  @Prop({required: true}) cardData!: VitalSignCardData

  chart: echarts.ECharts | null = null

  get activeMetric(): VitalSignMetric {
    const metric = this.cardData.metrics.find(item => item.key === this.cardData.activeMetric)
    return metric || this.cardData.metrics[0]
  }

  get activeSeries(): VitalSignSeries[] {
    return this.cardData.seriesMap[this.activeMetric.key] || []
  }

  get activeUnitText(): string {
    if (this.activeMetric.key !== 'bmi') {
      return this.activeMetric.unit
    }
    return this.activeSeries.map(series => `${series.name}${series.unit}`).join('、')
  }

  get chartMaxValue(): number {
    const values = this.activeSeries.reduce((result: number[], series) => result.concat(series.values), [])
    const maxValue = values.length ? Math.max(...values) : 0
    if (maxValue <= 10) {
      return 12
    }
    return Math.ceil(maxValue / 30) * 30
  }

  get chartInterval(): number {
    if (this.chartMaxValue <= 12) {
      return 2
    }
    return this.chartMaxValue / 6
  }

  mounted(): void {
    this.$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy(): void {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }

  @Watch('cardData.activeMetric')
  handleActiveMetricChange(): void {
    this.$nextTick(() => {
      this.renderChart()
    })
  }

  handleMetricClick(metricKey: VitalSignMetricKey): void {
    this.$emit('metric-change', metricKey)
  }

  initChart(): void {
    const chartEl = this.getChartEl()
    if (!chartEl) {
      return
    }
    this.chart = echarts.init(chartEl)
    this.renderChart()
    setTimeout(() => {
      this.chart && this.chart.resize()
    }, 0)
  }

  getChartEl(): HTMLDivElement | null {
    const chartRef = this.$refs.chart as HTMLDivElement | Vue | undefined
    if (!chartRef) {
      return null
    }
    if (chartRef instanceof HTMLElement) {
      return chartRef as HTMLDivElement
    }
    return ((chartRef as Vue).$el || null) as HTMLDivElement | null
  }

  renderChart(): void {
    if (!this.chart) {
      return
    }
    this.chart.setOption({
      animation: false,
      grid: {
        left: 36,
        right: 30,
        top: 20,
        bottom: 28
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.cardData.dates,
        axisTick: {
          show: true,
          lineStyle: {
            color: '#CCCCCC'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#CCCCCC'
          }
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: this.chartMaxValue,
        interval: this.chartInterval,
        axisLabel: {
          color: '#888888',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#DDDDDD',
            type: 'dashed'
          }
        }
      },
      series: this.activeSeries.map(series => ({
        name: series.name,
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: series.color
        },
        data: series.values
      }))
    }, true)
  }
}
</script>

<style lang="scss" scoped>
.vital-signs-card {
  margin: 24rpx 16rpx;
  padding: 24rpx 28rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100rpx);
  box-sizing: border-box;
}

.vital-signs-header {
  display: flex;
  align-items: center;
}

.vital-signs-title {
  color: #202020;
  line-height: 44rpx;
}

.vital-signs-tabs {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 26rpx;
}

.vital-signs-tab {
  min-width: 64rpx;
  height: 48rpx;
  margin-left: 16rpx;
  padding: 0 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  color: #666666;
  box-sizing: border-box;
}

.vital-signs-tab-active {
  background: #1E74FE;
  color: #FFFFFF;
}

.vital-signs-legend-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28rpx;
}

.vital-signs-unit {
  color: #666666;
}

.vital-signs-legends {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.vital-signs-legend {
  display: flex;
  align-items: center;
  margin-left: 40rpx;
  white-space: nowrap;
  flex-shrink: 0;
}

.vital-signs-legend-line {
  width: 28rpx;
  height: 6rpx;
}

.vital-signs-legend-dot {
  width: 10rpx;
  height: 10rpx;
  margin-left: -24rpx;
  margin-right: 12rpx;
  border: 5rpx solid;
  border-radius: 50%;
  background: #FFFFFF;
}

.vital-signs-legend-text {
  color: #666666;
}

.vital-signs-chart {
  width: 100%;
  height: 260rpx;
  margin-top: 12rpx;
}
</style>
