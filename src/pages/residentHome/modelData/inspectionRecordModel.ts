/**
 * 检验检查记录卡片数据模型
 */

/** 记录类型 */
export enum RecordType {
  Inspection = 'inspection', // 检验
  Examination = 'examination' // 检查
}

/** 检验检查记录项 */
export interface InspectionRecord {
  name: string // 检验/检查项目名称
  isAbnormal: boolean // 是否异常
  dateTime: string // 日期时间，格式如 "10-01 12:23"
}

/** Tab 数据 */
export interface InspectionTab {
  key: RecordType
  title: string
  count: number
  records: InspectionRecord[]
}

/** 检验检查记录卡片数据 */
export interface InspectionRecordCardData {
  activeTab: RecordType
  tabs: InspectionTab[]
}
