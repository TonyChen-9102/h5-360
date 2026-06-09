/**
 * 手术记录卡片数据模型
 */

/** 手术记录项 */
export interface SurgeryRecord {
  name: string // 手术名称
  dateTime: string // 手术日期，格式如 "2026-04-10"
}

/** 手术记录卡片数据 */
export interface SurgeryRecordCardData {
  count: number // 记录总数
  records: SurgeryRecord[] // 手术记录列表
}
