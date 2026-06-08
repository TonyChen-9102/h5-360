/**
 * 生命体征卡片数据模型
 * 定义生命体征指标、图表点位和卡片数据结构
 */

export type VitalSignMetricKey = 'bloodPressure' | 'bloodSugar' | 'bmi'

export interface VitalSignMetric {
  key: VitalSignMetricKey
  title: string
  unit: string
}

export interface VitalSignSeries {
  name: string
  unit: string
  color: string
  values: number[]
}

export interface VitalSignCardData {
  activeMetric: VitalSignMetricKey
  metrics: VitalSignMetric[]
  dates: string[]
  seriesMap: Record<VitalSignMetricKey, VitalSignSeries[]>
}
