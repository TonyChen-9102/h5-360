/**
 * 用药记录卡片数据模型
 */

/** 用药记录项 */
export interface MedicationRecord {
  name: string // 药品名称
  dosage: string // 剂量
  dateTime: string // 日期，格式如 "2026-04-10"
}

/** 用药记录卡片数据 */
export interface MedicationRecordCardData {
  count: number // 记录总数
  records: MedicationRecord[]
}
