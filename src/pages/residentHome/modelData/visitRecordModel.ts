/**
 * 就诊记录卡片数据模型
 */

/** 就诊类型 */
export enum VisitType {
  Outpatient = '门', // 门诊
  Inpatient = '住', // 住院
  Emergency = '急', // 急诊
  Physical = '体' // 体检
}

/** 就诊记录 */
export interface VisitRecord {
  type: VisitType // 就诊类型
  department: string // 就诊科室
  hospital: string // 就诊医院名称
  date: string // 就诊日期
}

/** 就诊记录卡片数据 */
export interface VisitRecordCardData {
  count: number // 记录总数
  records: VisitRecord[] // 就诊记录列表
}
