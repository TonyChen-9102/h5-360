/**
 * 就诊记录卡片数据模型
 */

/** 就诊类型 */
export enum VisitType {
  Outpatient = '门', // 门诊
  Inpatient = '住',   // 住院
  Emergency = '急',   // 急诊
  Physical = '体'     // 体检
}

/** 就诊记录 */
export interface VisitRecord {
  type: VisitType
  department: string
  hospital: string
  date: string
}

/** 就诊记录卡片数据 */
export interface VisitRecordCardData {
  count: number
  records: VisitRecord[]
}
