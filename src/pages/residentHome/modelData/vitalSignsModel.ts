/**
 * 生命体征卡片数据模型
 * 定义生命体征指标、图表点位和卡片数据结构
 */

export type VitalSignMetricKey = 'bloodPressure' | 'bloodSugar' | 'bmi'

export interface VitalSignMetric {
  key: VitalSignMetricKey // 指标唯一标识
  title: string // 指标标题
  unit: string // 指标单位
}

export interface VitalSignSeries {
  name: string // 图表序列名称
  unit: string // 序列数值单位
  color: string // 序列展示颜色
  values: number[] // 序列数据点列表
}

export interface VitalSignCardData {
  activeMetric: VitalSignMetricKey // 当前激活的生命体征指标
  metrics: VitalSignMetric[] // 可切换的指标列表
  dates: string[] // 图表横轴日期列表
  seriesMap: Record<VitalSignMetricKey, VitalSignSeries[]> // 各指标对应的图表序列映射
}
