/**
 * 过敏信息页面数据模型
 */
export enum AllergyLevel {
  Low = 'low', // 低风险过敏等级
  Medium = 'medium', // 中风险过敏等级
  High = 'high' // 高风险过敏等级
}

export interface AllergyDetailItem {
  label: string // 详情字段名称
  value: string // 详情字段内容
}

export interface AllergyInfoItem {
  name: string // 过敏原或过敏事项名称
  level: AllergyLevel // 过敏等级
  details: AllergyDetailItem[] // 过敏详情列表
}

export interface AllergyInfoPageData {
  list: AllergyInfoItem[] // 过敏信息列表
}
